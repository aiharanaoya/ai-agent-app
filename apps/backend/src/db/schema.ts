import { index, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const articles = sqliteTable(
	'articles',
	{
		id: text('id').primaryKey(),
		url: text('url').notNull().unique(),
		title: text('title').notNull(),
		description: text('description'),
		source: text('source').notNull(),
		category: text('category').notNull(),
		publishedAt: text('published_at'),
		fetchedAt: text('fetched_at').notNull(),
		status: text('status').notNull().default('pending'),
		titleJa: text('title_ja'),
	},
	(t) => [
		index('idx_articles_status').on(t.status),
		index('idx_articles_category').on(t.category),
		index('idx_articles_fetched').on(t.fetchedAt),
	],
);
