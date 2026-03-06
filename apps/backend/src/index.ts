import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serve } from '@hono/node-server'
import { myAgent } from './agent.js'
import { listTasks } from './tasks.js'

const app = new Hono()

app.use('*', cors({ origin: 'http://localhost:5173' }))

app.post('/api/chat', async (c) => {
  const { messages } = await c.req.json<{
    messages: Parameters<typeof myAgent.stream>[0]
  }>()

  const result = await myAgent.stream(messages)
  return new Response(result.textStream as unknown as BodyInit, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Transfer-Encoding': 'chunked',
    },
  })
})

app.get('/api/tasks', (c) => {
  return c.json({ tasks: listTasks() })
})

serve({ fetch: app.fetch, port: 3000 }, () => {
  console.log('Backend running on http://localhost:3000')
})
