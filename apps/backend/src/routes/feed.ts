import { desc } from 'drizzle-orm';
import { Hono } from 'hono';
import { createDb } from '@/db/index.js';
import { digests } from '@/db/schema.js';
import { buildFeed } from '@/services/feed.js';
import type { Env } from '@/types.js';

export const feedRoutes = new Hono<{ Bindings: Env }>();

feedRoutes.get('/latest', async (c) => {
	const db = createDb(c.env.DB);

	// digestsテーブルの最新日付を基準に「今日のフィード」を返す
	const latest = await db
		.select({ date: digests.date })
		.from(digests)
		.orderBy(desc(digests.date))
		.limit(1);

	if (!latest[0]) {
		return c.json({ error: 'No feed available yet' }, 404);
	}

	const feed = await buildFeed(db, latest[0].date);
	return c.json(feed);
});

feedRoutes.get('/:date', async (c) => {
	const date = c.req.param('date');

	if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
		return c.json({ error: 'Invalid date format. Use YYYY-MM-DD.' }, 400);
	}

	const db = createDb(c.env.DB);
	const feed = await buildFeed(db, date);

	if (feed.sections.every((s) => s.articles.length === 0)) {
		return c.json({ error: `No feed for ${date}` }, 404);
	}

	return c.json(feed);
});
