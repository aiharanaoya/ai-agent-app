import type { DailyFeed } from '@/types';

export const MOCK_FEED: DailyFeed = {
	date: '2026-05-24',
	generatedAt: '2026-05-24T08:12:00Z',
	sections: [
		{
			key: 'frontend',
			label: 'フロントエンド',
			tag: 'TECH',
			articles: [
				{
					id: 'f1',
					title: 'React 20 RC: コンパイラが正式統合、手動メモ化が不要に',
					titleJa: null,
					url: 'https://example.com/f1',
					source: 'Zenn',
				},
				{
					id: 'f2',
					title: 'Vite 7 Released — Rolldown Adoption Speeds Up Builds 10x',
					titleJa: 'Vite 7リリース——Rolldown採用でビルド速度が最大10倍向上',
					url: 'https://example.com/f2',
					source: 'Smashing Magazine',
				},
				{
					id: 'f3',
					title: 'CSS Anchor Positioning API Now Stable in All Browsers',
					titleJa: 'CSS Anchor Positioning APIが全ブラウザで安定版に',
					url: 'https://example.com/f3',
					source: 'Frontend Focus',
				},
				{
					id: 'f4',
					title: 'TypeScript 5.8の新機能まとめ——satisfies演算子の活用パターン',
					titleJa: null,
					url: 'https://example.com/f4',
					source: 'Zenn',
				},
				{
					id: 'f5',
					title: 'Node.js 24 Released with Updated V8 Engine',
					titleJa: 'Node.js 24リリース、V8エンジンを更新しパフォーマンスが向上',
					url: 'https://example.com/f5',
					source: 'Smashing Magazine',
				},
			],
		},
		{
			key: 'ai',
			label: 'AI',
			tag: 'AI',
			articles: [
				{
					id: 'a1',
					title:
						'Claude 4 Announced — Benchmark Results Beat GPT-5 on Coding Tasks',
					titleJa:
						'Claude 4発表——コーディング精度でGPT-5を上回るベンチマーク結果',
					url: 'https://example.com/a1',
					source: 'TechCrunch AI',
				},
				{
					id: 'a2',
					title: 'OpenAI Reveals Internal AGI Scorecard for the First Time',
					titleJa: 'OpenAI、AGI到達の内部基準「AGIスコアカード」を初公開',
					url: 'https://example.com/a2',
					source: 'TechCrunch AI',
				},
				{
					id: 'a3',
					title:
						'Google Project Astra Japanese Demo Shows Real-Time Video Analysis',
					titleJa:
						'Google「Project Astra」日本語対応デモ——リアルタイム映像解析を披露',
					url: 'https://example.com/a3',
					source: 'The Batch',
				},
				{
					id: 'a4',
					title: 'GitHub Copilot Code Review Feature Reaches GA',
					titleJa: 'GitHub Copilot、コードレビュー自動化機能をGAに昇格',
					url: 'https://example.com/a4',
					source: 'TechCrunch AI',
				},
			],
		},
		{
			key: 'economy',
			label: '経済',
			tag: 'ECONOMY',
			articles: [
				{
					id: 'e1',
					title: 'Bank of Japan Holds Rates as Yen Weakness Complicates Policy',
					titleJa: '日銀、追加利上げを当面見送りへ——円安是正との板挟みが続く',
					url: 'https://example.com/e1',
					source: 'Reuters',
				},
				{
					id: 'e2',
					title: 'Chip Giants Raise Forecasts as AI Memory Demand Surges',
					titleJa: '半導体大手3社が業績を上方修正——AI向けHBM需要が予想超え',
					url: 'https://example.com/e2',
					source: 'FT',
				},
				{
					id: 'e3',
					title:
						'東証プライム時価総額が過去最高更新——外国人投資家の買い越し継続',
					titleJa: null,
					url: 'https://example.com/e3',
					source: '日経',
				},
				{
					id: 'e4',
					title: 'G7 Finance Ministers Agree on AI Tax Framework',
					titleJa: 'G7財務相会合、AIの経済影響と課税ルールの整備で合意',
					url: 'https://example.com/e4',
					source: 'Reuters',
				},
			],
		},
		{
			key: 'trend',
			label: '流行・イベント',
			tag: 'TREND',
			articles: [
				{
					id: 't1',
					title: '大阪・関西万博が開幕——初週来場者100万人を突破',
					titleJa: null,
					url: 'https://example.com/t1',
					source: 'Yahoo! エンタメ',
				},
				{
					id: 't2',
					title: '「こども誰でも通園制度」全国展開スタート、SNSで体験談が拡散',
					titleJa: null,
					url: 'https://example.com/t2',
					source: 'Yahoo! エンタメ',
				},
				{
					id: 't3',
					title: "Tokyo's New SCRAMBLE X Complex Opens to Long Queues",
					titleJa: '渋谷に体験型複合施設「SCRAMBLE X」がオープン——連日行列',
					url: 'https://example.com/t3',
					source: 'Time Out Tokyo',
				},
				{
					id: 't4',
					title: 'Netflix春アニメランキング、「ダンダダン」2期が首位を独走',
					titleJa: null,
					url: 'https://example.com/t4',
					source: 'Yahoo! エンタメ',
				},
			],
		},
	],
};
