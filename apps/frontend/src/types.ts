export type CategoryKey = 'frontend' | 'ai' | 'economy' | 'trend';

export interface ArticleLink {
	id: string;
	title: string;
	titleJa: string | null;
	url: string;
	source: string;
}

export interface BriefingSection {
	key: CategoryKey;
	label: string;
	tag: string;
	articles: ArticleLink[];
}

export interface DailyFeed {
	date: string;
	generatedAt: string;
	sections: BriefingSection[];
}
