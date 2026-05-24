import type { DailyFeed } from '@/types';

export const MOCK_FEED: DailyFeed = {
	date: '2026-05-24',
	generatedAt: '2026-05-24T08:12:00Z',
	sections: [
		{
			key: 'frontend',
			label: 'フロントエンド',
			tag: 'TECH',
			digest:
				'React 20のリリース候補版が公開され、コンパイラが正式統合されました。手動メモ化の必要性がほぼ解消され、Server Componentsとのデータフロー設計も大幅に簡素化されています。同日、Vite 7がRustベースのRolldownを採用し、ビルド速度が最大10倍に向上しました。CSS Anchor Positioning APIも全主要ブラウザで安定化し、ポップオーバーをJSなしで実装できるようになりました。',
			articles: [
				{
					id: 'f1',
					title: 'React 20 RC: コンパイラが正式統合、手動メモ化が不要に',
					url: 'https://example.com/f1',
					source: 'Zenn',
				},
				{
					id: 'f2',
					title: 'Vite 7リリース——Rolldown採用でビルド速度が最大10倍向上',
					url: 'https://example.com/f2',
					source: 'Smashing Magazine',
				},
				{
					id: 'f3',
					title: 'CSS Anchor Positioning APIが全ブラウザで安定版に',
					url: 'https://example.com/f3',
					source: 'web.dev',
				},
				{
					id: 'f4',
					title: 'TypeScript 5.8の新機能まとめ——satisfies演算子の活用パターン',
					url: 'https://example.com/f4',
					source: 'Zenn',
				},
				{
					id: 'f5',
					title: 'Node.js 24リリース、V8エンジンを更新しパフォーマンスが向上',
					url: 'https://example.com/f5',
					source: 'Node.js Blog',
				},
				{
					id: 'f6',
					title: 'Storybook 9.0が正式リリース——Vitest統合とパフォーマンス改善',
					url: 'https://example.com/f6',
					source: 'Storybook',
				},
			],
		},
		{
			key: 'ai',
			label: 'AI',
			tag: 'AI',
			digest:
				'AnthropicがClaude 4を発表し、コーディングタスクでGPT-5を上回るベンチマーク結果を公開しました。複数ファイルにまたがるリファクタリングや、長大なコードレビューで特に顕著な改善が確認されています。OpenAIはAGI到達の内部評価基準「AGIスコアカード」を初公開し、GoogleはProject Astraの日本語対応デモを披露しました。',
			articles: [
				{
					id: 'a1',
					title:
						'Claude 4発表——コーディング精度でGPT-5を上回るベンチマーク結果',
					url: 'https://example.com/a1',
					source: 'TechCrunch',
				},
				{
					id: 'a2',
					title: 'OpenAI、AGI到達の内部基準「AGIスコアカード」を初公開',
					url: 'https://example.com/a2',
					source: 'TechCrunch',
				},
				{
					id: 'a3',
					title:
						'Google「Project Astra」日本語対応デモ——リアルタイム映像解析を披露',
					url: 'https://example.com/a3',
					source: 'The Verge',
				},
				{
					id: 'a4',
					title:
						'Meta、音声・映像・テキストを統合する次世代マルチモーダルモデルを発表',
					url: 'https://example.com/a4',
					source: 'The Verge',
				},
				{
					id: 'a5',
					title: '生成AIの電力消費が2027年に原発5基分に相当——IEA報告書',
					url: 'https://example.com/a5',
					source: 'Reuters',
				},
				{
					id: 'a6',
					title: 'GitHub Copilot、コードレビュー自動化機能をGAに昇格',
					url: 'https://example.com/a6',
					source: 'GitHub',
				},
				{
					id: 'a7',
					title: 'Mistral AI、日本語特化の小型モデル「Mistral-JP-7B」を公開',
					url: 'https://example.com/a7',
					source: 'Hugging Face',
				},
			],
		},
		{
			key: 'economy',
			label: '経済',
			tag: 'ECONOMY',
			digest:
				'日本銀行は5月の金融政策決定会合で政策金利を据え置きました。次回利上げは7月以降との見方が市場では大勢を占めています。一方、TSMC・Samsung・インテルの半導体大手3社が相次いで業績見通しを上方修正。生成AIサーバー向け高帯域メモリ（HBM）の需要が予想を大幅に上回り、AI関連需要が全体を下支えしています。',
			articles: [
				{
					id: 'e1',
					title: '日銀、追加利上げを当面見送りへ——円安是正との板挟みが続く',
					url: 'https://example.com/e1',
					source: 'Reuters',
				},
				{
					id: 'e2',
					title: '半導体大手3社が業績を上方修正——AI向けHBM需要が予想超え',
					url: 'https://example.com/e2',
					source: 'Financial Times',
				},
				{
					id: 'e3',
					title:
						'東証プライム時価総額が過去最高更新——外国人投資家の買い越し継続',
					url: 'https://example.com/e3',
					source: '日経',
				},
				{
					id: 'e4',
					title: 'G7財務相会合、AIの経済影響と課税ルールの整備で合意',
					url: 'https://example.com/e4',
					source: 'Reuters',
				},
				{
					id: 'e5',
					title: '原油価格が3カ月ぶり高値——中東緊張と供給削減が重なる',
					url: 'https://example.com/e5',
					source: 'Bloomberg',
				},
			],
		},
		{
			key: 'trend',
			label: '流行・イベント',
			tag: 'TREND',
			digest:
				'大阪・関西万博が開幕し、初週の来場者数が100万人を突破しました。日本館のデジタルアート展示と各国パビリオンが特に好評で、チケット販売は事前予測を上回るペースで推移しています。「こども誰でも通園制度」が4月から全国展開を開始し、SNSでは活用したリアルな育児体験談が多数共有されています。',
			articles: [
				{
					id: 't1',
					title: '大阪・関西万博が開幕——初週来場者100万人を突破',
					url: 'https://example.com/t1',
					source: 'NHK',
				},
				{
					id: 't2',
					title: '「こども誰でも通園制度」全国展開スタート、SNSで体験談が拡散',
					url: 'https://example.com/t2',
					source: 'NHK',
				},
				{
					id: 't3',
					title: '渋谷に体験型複合施設「SCRAMBLE X」がオープン——連日行列',
					url: 'https://example.com/t3',
					source: 'TokyoTreat',
				},
				{
					id: 't4',
					title: 'Netflix春アニメランキング、「ダンダダン」2期が首位を独走',
					url: 'https://example.com/t4',
					source: 'Yahoo!',
				},
				{
					id: 't5',
					title:
						'スタバの「抹茶フラペチーノ新作」が発売初日で品薄——SNSで話題沸騰',
					url: 'https://example.com/t5',
					source: 'Buzzfeed',
				},
				{
					id: 't6',
					title: '東京マラソン2026の参加者募集開始——過去最多の応募が予想',
					url: 'https://example.com/t6',
					source: '日刊スポーツ',
				},
			],
		},
	],
};
