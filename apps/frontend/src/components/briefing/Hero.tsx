import type { FC } from 'react';
import {
	formatDateEn,
	formatDateJa,
	formatDayOfWeek,
	formatUpdatedTime,
} from '@/lib/date';
import type { DailyFeed } from '@/types';

interface Props {
	feed: DailyFeed;
}

const Stat: FC<{ n: number; label: string }> = ({ n, label }) => (
	<div>
		<div
			className="font-display font-black leading-none text-white"
			style={{ fontSize: 'var(--text-4xl)' }}
		>
			{n}
		</div>
		<div
			className="mt-1 font-semibold tracking-widest text-white/60"
			style={{ fontSize: 10, letterSpacing: 'var(--tracking-widest)' }}
		>
			{label}
		</div>
	</div>
);

export const Hero: FC<Props> = ({ feed }) => {
	const totalArticles = feed.sections.reduce(
		(sum, s) => sum + s.articles.length,
		0,
	);

	return (
		<div
			className="relative mb-6 overflow-hidden rounded-lg px-8 py-6"
			style={{
				background: 'linear-gradient(135deg, #005A9C 0%, #0A1628 100%)',
			}}
		>
			<div
				className="pointer-events-none absolute -right-10 -top-10 size-[180px] rounded-full"
				style={{ background: 'rgba(255,255,255,0.05)' }}
			/>
			<div
				className="pointer-events-none absolute bottom-[-50px] right-16 size-[110px] rounded-full"
				style={{ background: 'rgba(239,62,66,0.15)' }}
			/>

			<div className="relative z-10 flex items-end justify-between gap-6">
				<div>
					<div
						className="mb-2 font-semibold uppercase tracking-widest text-white/60"
						style={{ fontSize: 'var(--text-xs)' }}
					>
						{formatDateEn(feed.date)}
					</div>
					<div
						className="font-display font-bold uppercase leading-none tracking-tight text-white"
						style={{ fontSize: 'var(--text-5xl)' }}
					>
						{formatDateJa(feed.date)}
					</div>
					<div
						className="mt-1 font-display font-medium uppercase leading-tight tracking-tight text-white/70"
						style={{ fontSize: 'var(--text-2xl)' }}
					>
						{formatDayOfWeek(feed.date)}
					</div>
				</div>

				<div className="text-right">
					<div className="mb-1 flex justify-end gap-6">
						<Stat n={feed.sections.length} label="CATEGORIES" />
						<Stat n={totalArticles} label="ARTICLES" />
					</div>
					<div
						className="mt-2 text-white/55"
						style={{ fontSize: 'var(--text-xs)' }}
					>
						UPDATED {formatUpdatedTime(feed.generatedAt)}
					</div>
				</div>
			</div>
		</div>
	);
};
