import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serve } from '@hono/node-server'
import { myAgent } from './agent.js'
import { listTasks } from './tasks.js'

const app = new Hono()

app.use('*', cors({ origin: 'http://localhost:5173' }))

app.post('/api/chat', async (c) => {
  const { message, history = [] } = await c.req.json<{
    message: string
    history: { role: 'user' | 'assistant'; content: string }[]
  }>()

  const messages = [
    ...history.map((m) => ({ role: m.role, content: m.content })),
    { role: 'user' as const, content: message },
  ]

  try {
    const result = await myAgent.generate(messages)
    return c.json({ text: result.text })
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    return c.json({ error: message }, 500)
  }
})

app.get('/api/tasks', (c) => {
  return c.json({ tasks: listTasks() })
})

serve({ fetch: app.fetch, port: 3000 }, () => {
  console.log('Backend running on http://localhost:3000')
})
