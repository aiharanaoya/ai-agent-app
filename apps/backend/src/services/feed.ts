import { and, desc, eq, like } from 'drizzle-orm';
import { CATEGORIES, CATEGORY_TAGS } from '@/config.js';
import type { Db } from '@/db/index.js';
import { articles } from '@/db/schema.js';
import type { BriefingSection, CategoryKey, DailyFeed } from '@/types.js';

export const buildFeed = async (db: Db, date: string): Promise<DailyFeed> => {
	const sections: BriefingSection[] = [];

	for (const key of Object.keys(CATEGORIES) as CategoryKey[]) {
		const articleRows = await db
			.select({
				id: articles.id,
				title: articles.title,
				titleJa: articles.titleJa,
				url: articles.url,
				source: articles.source,
			})
			.from(articles)
			.where(and(eq(articles.category, key), eq(articles.status, 'translated'), like(articles.fetchedAt, `${date}%`)))
			.orderBy(desc(articles.fetchedAt))
			.limit(7);

		sections.push({
			key,
			label: CATEGORIES[key],
			tag: CATEGORY_TAGS[key],
			articles: articleRows,
		});
	}

	return {
		date,
		generatedAt: new Date().toISOString(),
		sections,
	};
};
