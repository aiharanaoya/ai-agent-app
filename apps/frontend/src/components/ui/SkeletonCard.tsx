import type { FC } from 'react';

export const SkeletonCard: FC = () => (
	<div
		className="mb-4 overflow-hidden rounded-md border border-gray-200 bg-white"
		style={{ animation: 'pulse 1.6s ease-in-out infinite' }}
	>
		<div className="flex items-center gap-3 border-b border-gray-100 px-6 pb-3 pt-5">
			<div className="h-5 w-14 rounded-full bg-gray-200" />
			<div className="h-6 w-32 rounded bg-gray-200" />
		</div>
		<div className="px-6 py-5">
			<div className="mb-2 h-4 rounded bg-gray-200" />
			<div className="h-4 w-4/5 rounded bg-gray-200" />
		</div>
		<div className="divide-y divide-gray-100 border-t border-gray-100 bg-gray-50">
			{[0, 1, 2].map((i) => (
				<div
					key={i}
					className="grid items-center gap-3 px-6 py-3"
					style={{ gridTemplateColumns: '36px 1fr auto' }}
				>
					<div className="h-5 w-6 rounded bg-gray-200" />
					<div className="h-3 rounded bg-gray-200" />
					<div className="h-5 w-16 rounded-full bg-gray-200" />
				</div>
			))}
		</div>
	</div>
);
