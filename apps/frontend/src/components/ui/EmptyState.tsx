import { Card } from '@aiharanaoya/ui';
import type { FC } from 'react';

export const EmptyState: FC = () => (
	<Card>
		<div className="px-6 py-20 text-center">
			<div className="font-display mb-4 text-5xl font-black uppercase tracking-wide text-gray-200">
				NO FEED
			</div>
			<p className="mb-2 text-base text-gray-400">
				この日のブリーフィングはまだ生成されていません。
			</p>
			<p className="text-sm text-gray-400">
				毎日 08:00 JST に自動更新されます。
			</p>
		</div>
	</Card>
);
