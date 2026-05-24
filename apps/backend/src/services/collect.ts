import { RSS_SOURCES } from '@/config.js';
import { createDb } from '@/db/index.js';
import { articles } from '@/db/schema.js';
import { jstNow } from '@/lib/jst.js';
import { parseRss } from '@/lib/rss.js';
import type { Env } from '@/types.js';

// URLをハッシュ化して記事IDを生成する（同じURLなら毎回同じIDになる）
const generateId = (url: string): string => {
	let hash = 0;
	for (let i = 0; i < url.length; i++) {
		hash = (hash * 31 + url.charCodeAt(i)) >>> 0;
	}
	return hash.toString(36);
};

export const collectArticles = async (env: Env): Promise<number> => {
	const db = createDb(env.DB);
	const fetchedAt = jstNow();
	let inserted = 0;

	for (const source of RSS_SOURCES) {
		try {
			const res = await fetch(source.url, {
				headers: { 'User-Agent': 'DailyBriefingBot/1.0' },
				signal: AbortSignal.timeout(8000),
			});
			if (!res.ok) continue;

			const xml = await res.text();
			const items = parseRss(xml, 8);

			for (const item of items) {
				await db
					.insert(articles)
					.values({
						id: generateId(item.link),
						url: item.link,
						title: item.title,
						description: item.description || null,
						source: source.label,
						category: source.category,
						publishedAt: item.pubDate || null,
						fetchedAt,
						status: 'pending',
					})
					.onConflictDoNothing(); // 同じURLの記事は2回挿入しない
				inserted++;
			}
		} catch {
			// ネットワークエラーなどはそのソースをスキップして続行
		}
	}

	return inserted;
};
