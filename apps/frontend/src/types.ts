export type CategoryKey = 'frontend' | 'ai' | 'economy' | 'trend';

export interface ArticleLink {
	id: string;
	title: string;
	url: string;
	source: string;
}

export interface BriefingSection {
	key: CategoryKey;
	label: string;
	tag: string;
	digest: string;
	articles: ArticleLink[];
}

export interface DailyFeed {
	date: string;
	generatedAt: string;
	sections: BriefingSection[];
}
