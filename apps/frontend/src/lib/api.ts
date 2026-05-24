import type { DailyFeed } from '@/types';

const BASE = import.meta.env.VITE_WORKER_URL ?? 'http://localhost:8787';
const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true';

export const fetchFeed = async (date?: string): Promise<DailyFeed> => {
	if (USE_MOCK) {
		const { MOCK_FEED } = await import('@/mocks/feed');
		return date ? { ...MOCK_FEED, date } : MOCK_FEED;
	}

	const url = date ? `${BASE}/api/feed/${date}` : `${BASE}/api/feed/latest`;
	const res = await fetch(url);
	if (!res.ok) throw new Error(res.statusText);
	return res.json();
};
