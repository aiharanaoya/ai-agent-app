import { eq } from 'drizzle-orm';
import { createDb } from '@/db/index.js';
import { articles } from '@/db/schema.js';
import { generateText } from '@/lib/gemini.js';
import type { Env } from '@/types.js';

const hasCjk = (text: string): boolean => /[　-鿿豈-﫿]/.test(text);

export const translateArticles = async (
	env: Env,
): Promise<{ translated: number; skipped: number }> => {
	const db = createDb(env.DB);

	const pending = await db
		.select({ id: articles.id, title: articles.title })
		.from(articles)
		.where(eq(articles.status, 'pending'));

	const toTranslate = pending.filter((a) => !hasCjk(a.title));
	const toSkip = pending.filter((a) => hasCjk(a.title));

	for (const article of toSkip) {
		await db
			.update(articles)
			.set({ status: 'translated' })
			.where(eq(articles.id, article.id));
	}

	if (toTranslate.length === 0) {
		return { translated: 0, skipped: toSkip.length };
	}

	const prompt = `以下の英語タイトルを自然な日本語に翻訳してください。番号付きリストのまま返してください。他の文言は不要です。

${toTranslate.map((a, i) => `${i + 1}. ${a.title}`).join('\n')}

翻訳:`;

	try {
		const result = await generateText(env.GEMINI_API_KEY, prompt);
		const lines = result.split('\n').filter((l) => /^\d+\./.test(l.trim()));

		// 行番号でマッピングすることでLLMが順序を変えても正しく対応する
		const translationMap = new Map<number, string>();
		for (const line of lines) {
			const match = line.trim().match(/^(\d+)\.\s*(.+)$/);
			if (match) {
				translationMap.set(Number(match[1]), match[2].trim());
			}
		}

		let translated = 0;
		for (let i = 0; i < toTranslate.length; i++) {
			const titleJa = translationMap.get(i + 1) ?? null;
			await db
				.update(articles)
				.set({ status: 'translated', titleJa })
				.where(eq(articles.id, toTranslate[i].id));
			if (titleJa) translated++;
		}

		return { translated, skipped: toSkip.length };
	} catch (err) {
		console.error('[translate] batch failed', err);
		for (const article of toTranslate) {
			await db
				.update(articles)
				.set({ status: 'error' })
				.where(eq(articles.id, article.id));
		}
		return { translated: 0, skipped: toSkip.length };
	}
};
