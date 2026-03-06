import { randomUUID } from 'crypto'

export type Task = {
  id: string
  title: string
  done: boolean
  createdAt: string
}

const tasks: Task[] = []

export function addTask(title: string): Task {
  const task: Task = {
    id: randomUUID(),
    title,
    done: false,
    createdAt: new Date().toISOString(),
  }
  tasks.push(task)
  return task
}

export function listTasks(): Task[] {
  return [...tasks]
}

export function completeTask(id: string): Task | null {
  const task = tasks.find((t) => t.id === id)
  if (!task) return null
  task.done = true
  return task
}

export function deleteTask(id: string): boolean {
  const index = tasks.findIndex((t) => t.id === id)
  if (index === -1) return false
  tasks.splice(index, 1)
  return true
}
