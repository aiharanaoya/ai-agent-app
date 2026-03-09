import { Checkbox } from './ui/checkbox';
import { cn } from './ui/utils';

type Task = {
	id: string;
	title: string;
	done: boolean;
};

export function TaskItem({ task }: { task: Task }) {
	return (
		<div
			className={cn(
				'flex items-center gap-3 rounded-lg border bg-card px-3 py-2.5 shadow-sm transition-opacity',
				task.done && 'opacity-50',
			)}
		>
			<Checkbox checked={task.done} disabled className="pointer-events-none" />
			<span
				className={cn(
					'text-sm flex-1 text-card-foreground',
					task.done && 'line-through text-muted-foreground',
				)}
			>
				{task.title}
			</span>
		</div>
	);
}
