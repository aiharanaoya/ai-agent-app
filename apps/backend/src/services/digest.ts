import { and, desc, eq } from 'drizzle-orm';
import { CATEGORIES } from '@/config.js';
import { createDb } from '@/db/index.js';
import { articles, digests } from '@/db/schema.js';
import { generateText } from '@/lib/gemini.js';
import { jstDate, jstNow } from '@/lib/jst.js';
import type { CategoryKey, Env } from '@/types.js';

export const generateDigests = async (env: Env): Promise<void> => {
	const db = createDb(env.DB);
	const date = jstDate();
	const now = jstNow();

	for (const key of Object.keys(CATEGORIES) as CategoryKey[]) {
		const rows = await db
			.select({ title: articles.title, summaryJa: articles.summaryJa })
			.from(articles)
			.where(and(eq(articles.category, key), eq(articles.status, 'summarized')))
			.orderBy(desc(articles.fetchedAt))
			.limit(10);

		// 記事がなければプレースホルダーを保存して次のカテゴリへ
		if (rows.length === 0) {
			await db
				.insert(digests)
				.values({
					date,
					category: key,
					digestJa: '本日はこのカテゴリの記事がありません。',
					createdAt: now,
				})
				.onConflictDoUpdate({
					target: [digests.date, digests.category],
					set: {
						digestJa: '本日はこのカテゴリの記事がありません。',
						createdAt: now,
					},
				});
			continue;
		}

		const articlesText = rows
			.map((row, i) => `${i + 1}. ${row.title}\n${row.summaryJa ?? ''}`)
			.join('\n\n');

		const prompt = `以下は「${CATEGORIES[key]}」カテゴリの本日の記事です。全体の傾向や重要なポイントを3〜5文の日本語ダイジェストにまとめてください。

${articlesText}

ダイジェスト:`;

		try {
			const digest = await generateText(env.GEMINI_API_KEY, prompt);

			// (date, category) の組み合わせはユニーク制約があるので再実行時は上書きする
			await db
				.insert(digests)
				.values({
					date,
					category: key,
					digestJa: digest.trim(),
					createdAt: now,
				})
				.onConflictDoUpdate({
					target: [digests.date, digests.category],
					set: { digestJa: digest.trim(), createdAt: now },
				});
		} catch {
			await db
				.insert(digests)
				.values({
					date,
					category: key,
					digestJa: 'ダイジェストの生成に失敗しました。',
					createdAt: now,
				})
				.onConflictDoUpdate({
					target: [digests.date, digests.category],
					set: {
						digestJa: 'ダイジェストの生成に失敗しました。',
						createdAt: now,
					},
				});
		}
	}
};
