import { format } from 'date-fns';
import { ja } from 'date-fns/locale';
import type { FC } from 'react';

export const Header: FC = () => {
	const dateLabel = format(new Date(), 'M月d日 (E)', { locale: ja });

	return (
		<header
			className="sticky top-0 z-50 flex h-14 items-center justify-between px-6"
			style={{
				background: 'var(--color-blue-500)',
				boxShadow: '0 2px 8px rgba(0,0,0,0.18)',
			}}
		>
			<div className="flex items-center gap-1.5">
				<span className="font-display text-2xl font-bold uppercase tracking-wide text-white">
					Daily
				</span>
				<span
					className="size-1.5 shrink-0 rounded-full"
					style={{ background: 'var(--color-red-500)' }}
				/>
				<span className="font-display text-2xl font-bold uppercase tracking-wide text-white">
					Briefing
				</span>
			</div>

			<div className="flex items-center gap-2">
				<span
					className="size-1.5 rounded-full"
					style={{ background: 'var(--color-red-500)' }}
				/>
				<span
					className="text-sm font-medium"
					style={{ color: 'rgba(255,255,255,0.85)' }}
				>
					{dateLabel}
				</span>
			</div>
		</header>
	);
};
