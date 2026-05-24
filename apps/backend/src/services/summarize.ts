import { eq } from 'drizzle-orm';
import { createDb } from '@/db/index.js';
import { articles } from '@/db/schema.js';
import { generateText } from '@/lib/gemini.js';
import type { Env } from '@/types.js';

export const summarizeArticles = async (env: Env): Promise<number> => {
	const db = createDb(env.DB);

	// まだ要約していない記事を最大25件取得する
	const pending = await db
		.select({
			id: articles.id,
			title: articles.title,
			description: articles.description,
			source: articles.source,
		})
		.from(articles)
		.where(eq(articles.status, 'pending'))
		.limit(25);

	const sleep = (ms: number) =>
		new Promise((resolve) => setTimeout(resolve, ms));

	let summarized = 0;

	for (const article of pending) {
		try {
			const prompt = `以下の記事を日本語で2〜3文に要約してください。原文のまま引用せず、自然な日本語で。

タイトル: ${article.title}
概要: ${article.description ?? '(なし)'}
ソース: ${article.source}

要約:`;

			const summary = await generateText(env.GEMINI_API_KEY, prompt);

			await db
				.update(articles)
				.set({ status: 'summarized', summaryJa: summary.trim() })
				.where(eq(articles.id, article.id));

			summarized++;
		} catch (err) {
			console.error(`[summarize] failed: ${article.id}`, err);
			await db
				.update(articles)
				.set({ status: 'error' })
				.where(eq(articles.id, article.id));
		}

		// 無料枠の分間レート制限（30req/min）に収まるよう間隔を空ける
		await sleep(2500);
	}

	return summarized;
};
