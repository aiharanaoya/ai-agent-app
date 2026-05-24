import { createRootRoute, Outlet } from '@tanstack/react-router';
import { Header } from '@/components/layout/Header';

export const Route = createRootRoute({
	component: () => (
		<>
			<Header />
			<main className="mx-auto max-w-[900px] px-5 pb-12 pt-6">
				<Outlet />
			</main>
		</>
	),
});
