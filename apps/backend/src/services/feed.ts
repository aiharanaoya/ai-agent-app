import { and, desc, eq } from 'drizzle-orm';
import { CATEGORIES, CATEGORY_TAGS } from '@/config.js';
import type { Db } from '@/db/index.js';
import { articles, digests } from '@/db/schema.js';
import type { BriefingSection, CategoryKey, DailyFeed } from '@/types.js';

export const buildFeed = async (db: Db, date: string): Promise<DailyFeed> => {
	const sections: BriefingSection[] = [];

	for (const key of Object.keys(CATEGORIES) as CategoryKey[]) {
		const articleRows = await db
			.select({
				id: articles.id,
				title: articles.title,
				url: articles.url,
				source: articles.source,
			})
			.from(articles)
			.where(and(eq(articles.category, key), eq(articles.status, 'summarized')))
			.orderBy(desc(articles.fetchedAt))
			.limit(7);

		const digestRows = await db
			.select({ digestJa: digests.digestJa })
			.from(digests)
			.where(and(eq(digests.date, date), eq(digests.category, key)))
			.limit(1);

		sections.push({
			key,
			label: CATEGORIES[key],
			tag: CATEGORY_TAGS[key],
			digest: digestRows[0]?.digestJa ?? '',
			articles: articleRows,
		});
	}

	return {
		date,
		generatedAt: new Date().toISOString(),
		sections,
	};
};
