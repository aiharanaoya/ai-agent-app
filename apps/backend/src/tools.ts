import { createTool } from '@mastra/core/tools'
import { z } from 'zod'
import { addTask, listTasks, completeTask, deleteTask } from './tasks.js'

export const addTaskTool = createTool({
  id: 'addTask',
  description: 'タスクを追加する。ユーザーの発言から追加すべき対象を抽出してタイトルにする（例：「牛乳を追加して」→「牛乳」）',
  inputSchema: z.object({
    title: z.string().describe('タスクのタイトル。ユーザーの発言そのままではなく、タスクの内容を簡潔に表した名詞や短いフレーズにする'),
  }),
  execute: async (inputData) => {
    const task = addTask(inputData.title)
    return { task }
  },
})

export const listTasksTool = createTool({
  id: 'listTasks',
  description: '全タスク一覧を取得する',
  inputSchema: z.object({}),
  execute: async () => {
    const tasks = listTasks()
    return { tasks }
  },
})

export const completeTaskTool = createTool({
  id: 'completeTask',
  description: 'タスクを完了にする',
  inputSchema: z.object({
    id: z.string().describe('完了にするタスクのID'),
  }),
  execute: async (inputData) => {
    const task = completeTask(inputData.id)
    if (!task) return { error: 'タスクが見つかりません' }
    return { task }
  },
})

export const deleteTaskTool = createTool({
  id: 'deleteTask',
  description: 'タスクを削除する',
  inputSchema: z.object({
    id: z.string().describe('削除するタスクのID'),
  }),
  execute: async (inputData) => {
    const success = deleteTask(inputData.id)
    return { success }
  },
})
