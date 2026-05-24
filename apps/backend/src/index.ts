import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { feedRoutes } from './routes/feed.js';
import { pipelineRoutes } from './routes/pipeline.js';
import { collectArticles } from './services/collect.js';
import { generateDigests } from './services/digest.js';
import { summarizeArticles } from './services/summarize.js';
import type { Env } from './types.js';

const app = new Hono<{ Bindings: Env }>();

app.use('*', cors({ origin: '*' }));

app.route('/api/feed', feedRoutes);
app.route('/api/run', pipelineRoutes);

// Cronハンドラ（毎朝8時JST = 23:00 UTC）
const scheduled: ExportedHandlerScheduledHandler<Env> = async (_event, env) => {
	await collectArticles(env);
	await summarizeArticles(env);
	await generateDigests(env);
};

export default {
	fetch: app.fetch,
	scheduled,
};
