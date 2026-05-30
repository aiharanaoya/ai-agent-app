import { GoogleGenAI } from '@google/genai';

export const generateText = async (
	apiKey: string,
	prompt: string,
): Promise<string> => {
	const ai = new GoogleGenAI({ apiKey });
	const response = await ai.models.generateContent({
		model: 'gemini-2.5-flash-lite',
		contents: prompt,
		config: { temperature: 0.4, maxOutputTokens: 8192 },
	});
	return response.text ?? '';
};
