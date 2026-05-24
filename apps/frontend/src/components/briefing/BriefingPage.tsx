import type { FC } from 'react';
import { DateNav } from '@/components/nav/DateNav';
import { EmptyState } from '@/components/ui/EmptyState';
import { SkeletonCard } from '@/components/ui/SkeletonCard';
import { todayStr } from '@/lib/date';
import { useFeedQuery } from '@/queries/feedQueries';
import { Hero } from './Hero';
import { SectionCard } from './SectionCard';

interface Props {
	date?: string;
}

export const BriefingPage: FC<Props> = ({ date }) => {
	const targetDate = date ?? todayStr();
	const { data: feed, isLoading, isError } = useFeedQuery(date);

	return (
		<>
			{feed && <Hero feed={feed} />}

			<DateNav date={targetDate} />

			{isLoading && (
				<>
					<SkeletonCard />
					<SkeletonCard />
					<SkeletonCard />
					<SkeletonCard />
				</>
			)}

			{(isError || (feed && feed.sections.length === 0)) && <EmptyState />}

			{feed?.sections.map((section, i) => (
				<SectionCard key={section.key} section={section} index={i} />
			))}
		</>
	);
};
