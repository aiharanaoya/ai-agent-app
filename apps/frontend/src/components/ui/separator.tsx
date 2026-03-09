import * as SeparatorPrimitive from '@radix-ui/react-separator';
import type { ComponentPropsWithoutRef, Ref } from 'react';
import { cn } from './utils';

function Separator({
	className,
	orientation = 'horizontal',
	decorative = true,
	ref,
	...props
}: ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root> & {
	ref?: Ref<HTMLElement>;
}) {
	return (
		<SeparatorPrimitive.Root
			ref={ref}
			decorative={decorative}
			orientation={orientation}
			className={cn(
				'shrink-0 bg-border',
				orientation === 'horizontal' ? 'h-[1px] w-full' : 'h-full w-[1px]',
				className,
			)}
			{...props}
		/>
	);
}

export { Separator };
