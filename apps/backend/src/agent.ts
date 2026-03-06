import { Agent } from '@mastra/core/agent'
import { google } from '@ai-sdk/google'
import { addTaskTool, listTasksTool, completeTaskTool, deleteTaskTool } from './tools.js'

export const myAgent = new Agent({
  id: 'my-agent',
  name: 'my-agent',
  instructions: 'あなたはタスク管理アシスタントです。ユーザーの意図を読み取り適切なツールを呼び出してください。タスクを完了・削除する際は、まずlistTasksで一覧を取得してIDを確認してから操作してください。',
  tools: { addTaskTool, listTasksTool, completeTaskTool, deleteTaskTool },
  model: google('gemini-2.5-flash'),
})
