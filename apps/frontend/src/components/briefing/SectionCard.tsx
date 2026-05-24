import { Badge, Card } from '@aiharanaoya/ui';
import type { FC } from 'react';
import type { BriefingSection, CategoryKey } from '@/types';
import { ArticleRow } from './ArticleRow';

const BADGE_VARIANT: Record<
	CategoryKey,
	'blue' | 'solid-blue' | 'red' | 'gold'
> = {
	frontend: 'blue',
	ai: 'solid-blue',
	economy: 'red',
	trend: 'gold',
};

interface Props {
	section: BriefingSection;
	index: number;
}

export const SectionCard: FC<Props> = ({ section, index }) => (
	<div
		className="mb-4"
		style={{
			animation: 'fadeUp 0.4s ease both',
			animationDelay: `${index * 60}ms`,
		}}
	>
		<Card>
			<div className="flex items-center justify-between border-b border-gray-100 px-6 pb-3 pt-5">
				<div className="flex items-center gap-3">
					<Badge variant={BADGE_VARIANT[section.key]}>{section.tag}</Badge>
					<span className="font-display text-2xl font-bold uppercase tracking-wide text-gray-900">
						{section.label}
					</span>
				</div>
				<span className="text-xs font-semibold uppercase tracking-widest text-gray-400">
					{section.articles.length} ARTICLES
				</span>
			</div>

			<div className="px-6 py-5 text-base leading-relaxed text-gray-600">
				{section.digest}
			</div>

			<div className="divide-y divide-gray-100 border-t border-gray-100 bg-gray-50">
				{section.articles.map((article, i) => (
					<ArticleRow key={article.id} article={article} index={i} />
				))}
			</div>
		</Card>
	</div>
);
