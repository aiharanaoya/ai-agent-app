import { Hono } from 'hono';
import { collectArticles } from '@/services/collect.js';
import { translateArticles } from '@/services/translate.js';
import type { Env } from '@/types.js';

export const pipelineRoutes = new Hono<{ Bindings: Env }>();

pipelineRoutes.post('/', async (c) => {
	try {
		const collected = await collectArticles(c.env);
		const { translated, skipped } = await translateArticles(c.env);
		return c.json({ ok: true, collected, translated, skipped });
	} catch (err) {
		const message = err instanceof Error ? err.message : String(err);
		return c.json({ ok: false, error: message }, 500);
	}
});

pipelineRoutes.post('/phase/:n', async (c) => {
	const n = c.req.param('n');
	try {
		switch (n) {
			case '1':
				return c.json({ ok: true, collected: await collectArticles(c.env) });
			case '2': {
				const result = await translateArticles(c.env);
				return c.json({ ok: true, ...result });
			}
			default:
				return c.json({ error: 'Invalid phase. Use 1-2.' }, 400);
		}
	} catch (err) {
		const message = err instanceof Error ? err.message : String(err);
		return c.json({ ok: false, error: message }, 500);
	}
});
