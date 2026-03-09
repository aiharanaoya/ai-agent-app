import { useChat } from '@ai-sdk/react';
import { useCallback, useEffect, useState } from 'react';
import { AppHeader } from './components/AppHeader';
import { ChatPanel } from './components/ChatPanel';
import { TaskPanel } from './components/TaskPanel';

type Task = {
	id: string;
	title: string;
	done: boolean;
};

const API = 'http://localhost:3000';

export default function App() {
	const [tasks, setTasks] = useState<Task[]>([]);

	const fetchTasks = useCallback(async () => {
		try {
			const res = await fetch(`${API}/api/tasks`);
			const data = await res.json();
			setTasks(data.tasks);
		} catch {
			console.error('Failed to fetch tasks');
		}
	}, []);

	useEffect(() => {
		fetchTasks();
	}, [fetchTasks]);

	const { messages, input, handleInputChange, handleSubmit, isLoading } =
		useChat({
			api: `${API}/api/chat`,
			streamProtocol: 'text',
			initialMessages: [
				{
					id: 'init',
					role: 'assistant',
					content:
						'こんにちは！タスク管理をお手伝いします。「牛乳を追加して」などと話しかけてください。',
				},
			],
			onFinish: () => fetchTasks(),
		});

	return (
		<div className="flex flex-col h-screen bg-background">
			<AppHeader />
			<div className="flex flex-1 overflow-hidden">
				<ChatPanel
					messages={messages}
					loading={isLoading}
					input={input}
					onInputChange={handleInputChange}
					onSend={handleSubmit}
				/>
				<TaskPanel tasks={tasks} />
			</div>
		</div>
	);
}
