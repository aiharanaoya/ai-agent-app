import { createFileRoute } from '@tanstack/react-router';
import { BriefingPage } from '@/components/briefing/BriefingPage';

export const Route = createFileRoute('/$date')({
	component: () => {
		const { date } = Route.useParams();
		return <BriefingPage date={date} />;
	},
});
