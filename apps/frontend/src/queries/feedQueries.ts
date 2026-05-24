import { useQuery } from '@tanstack/react-query';
import { fetchFeed } from '@/lib/api';
import type { DailyFeed } from '@/types';

export const useFeedQuery = (date?: string) =>
	useQuery<DailyFeed>({
		queryKey: ['feed', date ?? 'latest'],
		queryFn: () => fetchFeed(date),
		staleTime: 10 * 60 * 1000,
		retry: 1,
	});
