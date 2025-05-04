"use client";

import { Skeleton } from "@/components/ui/skeleton";

export function ArticleCardSkeleton() {
	return (
		<div className='w-full h-full flex flex-col gap-2'>
			<Skeleton className='w-full h-56' />

			<div className='flex flex-col gap-2'>
				<Skeleton className='w-full h-4' />
				<Skeleton className='w-full h-4' />
				<Skeleton className='w-2/3 h-4' />
			</div>

			<div className='flex items-center gap-2'>
				<Skeleton className='w-6 h-6 rounded-full' />
				<Skeleton className='w-24 h-4' />
			</div>
		</div>
	);
}
