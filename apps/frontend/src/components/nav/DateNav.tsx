import { Button } from '@aiharanaoya/ui';
import { useNavigate } from '@tanstack/react-router';
import type { FC } from 'react';
import { isFuture, isToday, nextDate, prevDate } from '@/lib/date';

interface Props {
	date: string;
}

export const DateNav: FC<Props> = ({ date }) => {
	const navigate = useNavigate();
	const isCurrentToday = isToday(date);
	const nextD = nextDate(date);
	const nextDisabled = isFuture(nextD);

	return (
		<div className="mb-5 flex items-center justify-between">
			<button
				type="button"
				onClick={() =>
					navigate({ to: '/$date', params: { date: prevDate(date) } })
				}
				className="cursor-pointer border-none bg-transparent py-1 text-sm font-semibold"
				style={{ color: 'var(--color-blue-500)' }}
			>
				← 前日
			</button>

			{!isCurrentToday && (
				<Button
					variant="outline"
					size="sm"
					pill
					onClick={() => navigate({ to: '/' })}
				>
					今日に戻る
				</Button>
			)}

			<button
				type="button"
				onClick={() =>
					!nextDisabled && navigate({ to: '/$date', params: { date: nextD } })
				}
				disabled={nextDisabled}
				className="border-none bg-transparent py-1 text-sm font-semibold"
				style={{
					color: nextDisabled
						? 'var(--color-gray-300)'
						: 'var(--color-blue-500)',
					cursor: nextDisabled ? 'default' : 'pointer',
				}}
			>
				翌日 →
			</button>
		</div>
	);
};
