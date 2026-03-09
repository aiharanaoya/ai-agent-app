import type { Message } from '@ai-sdk/react';
import { useEffect, useRef } from 'react';
import { ChatInput } from './ChatInput';
import { MessageBubble } from './MessageBubble';
import { ThinkingBubble } from './ThinkingBubble';
import { ScrollArea } from './ui/scroll-area';

type Props = {
	messages: Message[];
	loading: boolean;
	input: string;
	onInputChange: React.ChangeEventHandler<HTMLInputElement>;
	onSend: () => void;
};

export function ChatPanel({
	messages,
	loading,
	input,
	onInputChange,
	onSend,
}: Props) {
	const bottomRef = useRef<HTMLDivElement>(null);

	// biome-ignore lint/correctness/useExhaustiveDependencies: scroll on message/loading changes is intentional
	useEffect(() => {
		bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
	}, [messages, loading]);

	return (
		<div className="flex flex-col border-r" style={{ width: '60%' }}>
			<ScrollArea className="flex-1">
				<div className="flex flex-col gap-4 px-5 py-5">
					{messages.map((msg) => (
						<MessageBubble key={msg.id} msg={msg} />
					))}
					{loading && <ThinkingBubble />}
					<div ref={bottomRef} />
				</div>
			</ScrollArea>
			<ChatInput
				value={input}
				onChange={onInputChange}
				onSend={onSend}
				loading={loading}
			/>
		</div>
	);
}
