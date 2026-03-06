import { Agent } from '@mastra/core/agent'
import { google } from '@ai-sdk/google'

export const myAgent = new Agent({
  id: 'my-agent',
  name: 'my-agent',
  instructions: 'あなたは役立つAIアシスタントです。',
  model: google('gemini-2.5-flash'),
})
