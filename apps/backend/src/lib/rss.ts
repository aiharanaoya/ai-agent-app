export interface RssItem {
	title: string;
	link: string;
	description: string;
	pubDate: string;
}

// CDATA付き・なし両方に対応して指定タグの中身を取り出す
const extractText = (xml: string, tag: string): string => {
	const cdataMatch = new RegExp(
		`<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]></${tag}>`,
	).exec(xml);
	if (cdataMatch) return cdataMatch[1].trim();

	const match = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`).exec(xml);
	if (match) return match[1].trim();

	return '';
};

// &amp; などのHTMLエンティティを元の文字に戻す
const decodeHtmlEntities = (str: string): string => {
	return str
		.replace(/&amp;/g, '&')
		.replace(/&lt;/g, '<')
		.replace(/&gt;/g, '>')
		.replace(/&quot;/g, '"')
		.replace(/&#39;/g, "'")
		.replace(/&apos;/g, "'");
};

// <p>タグなどのHTMLタグを全て除去する
const stripHtml = (str: string): string => str.replace(/<[^>]*>/g, '').trim();

// RSSフィードによっては <link> が自己終了タグ形式で書かれている場合がある
const extractLink = (xml: string): string => {
	const standard = extractText(xml, 'link');
	if (standard) return standard;

	// <link rel="alternate" href="https://..." /> 形式に対応
	const hrefMatch = /<link[^>]+href="([^"]+)"/i.exec(xml);
	return hrefMatch ? hrefMatch[1] : '';
};

export const parseRss = (xml: string, limit = 10): RssItem[] => {
	const items: RssItem[] = [];
	const itemPattern = /<item[\s>]([\s\S]*?)<\/item>/g;
	let match: RegExpExecArray | null = itemPattern.exec(xml);

	while (match !== null && items.length < limit) {
		const itemXml = match[1];

		const title = decodeHtmlEntities(stripHtml(extractText(itemXml, 'title')));
		const link = extractLink(itemXml);
		const description = decodeHtmlEntities(
			stripHtml(extractText(itemXml, 'description')),
		).slice(0, 500);
		const pubDate =
			extractText(itemXml, 'pubDate') ||
			extractText(itemXml, 'published') ||
			'';

		if (title && link) {
			items.push({ title, link, description, pubDate });
		}
		match = itemPattern.exec(xml);
	}

	return items;
};
