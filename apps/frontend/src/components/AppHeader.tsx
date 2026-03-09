import { Bot } from 'lucide-react';
import { Badge } from './ui/badge';

export function AppHeader() {
	return (
		<header className="border-b bg-card px-6 py-3 flex items-center gap-3 flex-shrink-0">
			<div className="flex items-center gap-2.5">
				<div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
					<Bot className="w-4 h-4 text-primary-foreground" />
				</div>
				<div>
					<h1 className="text-base">AI Task Manager</h1>
					<p className="text-xs text-muted-foreground leading-none mt-0.5">
						Mastra Agent × Tool Use Demo
					</p>
				</div>
			</div>
			<div className="ml-auto">
				<Badge variant="emerald" className="gap-1.5">
					<span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
					Agent Online
				</Badge>
			</div>
		</header>
	);
}
