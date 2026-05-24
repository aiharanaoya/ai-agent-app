import type { FC } from 'react';
import type { ArticleLink } from '@/types';

interface Props {
	article: ArticleLink;
	index: number;
}

export const ArticleRow: FC<Props> = ({ article, index }) => {
	const num = String(index + 1).padStart(2, '0');

	return (
		<a
			href={article.url}
			target="_blank"
			rel="noopener noreferrer"
			className="grid items-center gap-3 px-6 py-3 no-underline transition-colors hover:bg-blue-50"
			style={{ gridTemplateColumns: '36px 1fr auto' }}
		>
			<span className="font-display text-xl font-bold leading-none text-gray-300">
				{num}
			</span>

			<span className="text-sm font-medium leading-snug text-gray-800">
				{article.title}
			</span>

			<span className="whitespace-nowrap rounded-full border border-gray-200 bg-white px-2.5 py-[3px] text-xs font-semibold text-gray-600">
				{article.source}
			</span>
		</a>
	);
};
