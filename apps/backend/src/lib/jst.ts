// Cloudflare Workers の Date.now() は UTC なので +9時間してJSTに変換する
const JST_OFFSET_MS = 9 * 60 * 60 * 1000;

export const jstDate = (): string => {
	return new Date(Date.now() + JST_OFFSET_MS).toISOString().slice(0, 10);
};

export const jstNow = (): string => {
	return new Date(Date.now() + JST_OFFSET_MS)
		.toISOString()
		.replace('Z', '+09:00');
};
