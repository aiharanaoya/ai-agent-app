import { useState, useEffect, useCallback } from 'react'
import { AppHeader } from './components/AppHeader'
import { ChatPanel } from './components/ChatPanel'
import { TaskPanel } from './components/TaskPanel'

type Task = {
  id: string
  title: string
  done: boolean
}

type Message = {
  id: string
  role: 'user' | 'assistant'
  content: string
}

const API = 'http://localhost:3000'

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 5)
}

export default function App() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init',
      role: 'assistant',
      content: 'こんにちは！タスク管理をお手伝いします。「牛乳を追加して」などと話しかけてください。',
    },
  ])
  const [tasks, setTasks] = useState<Task[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const fetchTasks = async () => {
    try {
      const res = await fetch(`${API}/api/tasks`)
      const data = await res.json()
      setTasks(data.tasks)
    } catch {
      // backend may not be running
    }
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  const send = useCallback(async () => {
    if (!input.trim() || loading) return
    const userMessage = input.trim()
    const userMsg: Message = { id: generateId(), role: 'user', content: userMessage }
    const nextMessages = [...messages, userMsg]
    setMessages(nextMessages)
    setInput('')
    setLoading(true)

    try {
      const res = await fetch(`${API}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage,
          history: messages,
        }),
      })
      const data = await res.json()
      const text = data.text ?? `エラー: ${data.error ?? '不明なエラー'}`
      setMessages([...nextMessages, { id: generateId(), role: 'assistant', content: text }])
      await fetchTasks()
    } catch (err) {
      setMessages([
        ...nextMessages,
        { id: generateId(), role: 'assistant', content: 'サーバーに接続できませんでした。' },
      ])
    } finally {
      setLoading(false)
    }
  }, [input, loading, messages])

  return (
    <div className="flex flex-col h-screen bg-background">
      <AppHeader />
      <div className="flex flex-1 overflow-hidden">
        <ChatPanel
          messages={messages}
          loading={loading}
          input={input}
          onInputChange={setInput}
          onSend={send}
        />
        <TaskPanel tasks={tasks} />
      </div>
    </div>
  )
}
