const GEMINI_API_URL =
	'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite:generateContent';

type GeminiResponse = {
	candidates: Array<{
		content: { parts: Array<{ text: string }> };
	}>;
};

export const generateText = async (
	apiKey: string,
	prompt: string,
): Promise<string> => {
	const res = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			contents: [{ parts: [{ text: prompt }] }],
			generationConfig: { temperature: 0.4, maxOutputTokens: 512 },
		}),
	});

	if (!res.ok) {
		const errorText = await res.text();
		throw new Error(`Gemini API error ${res.status}: ${errorText}`);
	}

	const json = (await res.json()) as GeminiResponse;
	return json.candidates[0]?.content?.parts[0]?.text ?? '';
};
