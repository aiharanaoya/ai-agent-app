import { Hono } from 'hono';
import { collectArticles } from '@/services/collect.js';
import { generateDigests } from '@/services/digest.js';
import { summarizeArticles } from '@/services/summarize.js';
import type { Env } from '@/types.js';

export const pipelineRoutes = new Hono<{ Bindings: Env }>();

// フルパイプラインを手動実行する（開発・テスト用）
pipelineRoutes.post('/', async (c) => {
	try {
		const collected = await collectArticles(c.env);
		const summarized = await summarizeArticles(c.env);
		await generateDigests(c.env);
		return c.json({ ok: true, collected, summarized });
	} catch (err) {
		const message = err instanceof Error ? err.message : String(err);
		return c.json({ ok: false, error: message }, 500);
	}
});

// フェーズを個別に実行する（デバッグ用）
pipelineRoutes.post('/phase/:n', async (c) => {
	const n = c.req.param('n');
	try {
		switch (n) {
			case '1':
				return c.json({ ok: true, collected: await collectArticles(c.env) });
			case '2':
				return c.json({ ok: true, summarized: await summarizeArticles(c.env) });
			case '3':
				await generateDigests(c.env);
				return c.json({ ok: true });
			default:
				return c.json({ error: 'Invalid phase. Use 1-3.' }, 400);
		}
	} catch (err) {
		const message = err instanceof Error ? err.message : String(err);
		return c.json({ ok: false, error: message }, 500);
	}
});
