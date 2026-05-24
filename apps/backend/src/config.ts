import type { CategoryKey } from './types.js';

export const CATEGORIES: Record<CategoryKey, string> = {
	frontend: 'フロントエンド',
	ai: 'AI',
	economy: '経済',
	trend: '流行・イベント',
};

export const CATEGORY_TAGS: Record<CategoryKey, string> = {
	frontend: 'TECH',
	ai: 'AI',
	economy: 'ECONOMY',
	trend: 'TREND',
};

export interface RssSource {
	url: string;
	category: CategoryKey;
	label: string;
}

export const RSS_SOURCES: RssSource[] = [
	{ url: 'https://zenn.dev/feed', category: 'frontend', label: 'Zenn' },
	{
		url: 'https://www.smashingmagazine.com/feed/',
		category: 'frontend',
		label: 'Smashing Magazine',
	},
	{
		url: 'https://frontendfoc.us/rss',
		category: 'frontend',
		label: 'Frontend Focus',
	},
	{
		url: 'https://techcrunch.com/category/artificial-intelligence/feed/',
		category: 'ai',
		label: 'TechCrunch AI',
	},
	{
		url: 'https://www.deeplearning.ai/the-batch/feed/',
		category: 'ai',
		label: 'The Batch',
	},
	{
		url: 'https://feeds.reuters.com/reuters/businessNews',
		category: 'economy',
		label: 'Reuters',
	},
	{ url: 'https://www.ft.com/rss/home', category: 'economy', label: 'FT' },
	{
		url: 'https://rss.nikkei.com/n/cmt/contents.rss',
		category: 'economy',
		label: '日経',
	},
	{
		url: 'https://news.yahoo.co.jp/rss/topics/entertainment.xml',
		category: 'trend',
		label: 'Yahoo! エンタメ',
	},
	{
		url: 'https://www.timeout.com/tokyo/feed',
		category: 'trend',
		label: 'Time Out Tokyo',
	},
];
