"use client";

import { useCallback, useEffect, useState } from "react";
import { Member } from "@wix/auto_sdk_members_members";
import { wixService } from "@/lib/services/wix-service";
import Image from "next/image";
import Link from "next/link";
import { media } from "@wix/sdk";
import { Post as WixPost, Category } from "@wix/auto_sdk_blog_posts";
import { format } from "date-fns";

import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArticleCardSkeleton } from "@/components/article-card-skeleton";

interface ArticleCardProps {
	article: WixPost;
	categories: Category[];
	className?: string;
}

export function ArticleCard({
	article,
	categories,
	className,
}: ArticleCardProps) {
	const [member, setMember] = useState<Member | null>(null);

	const articleCategories = article.categoryIds?.map((id) =>
		categories.find((category) => category._id === id),
	);

	const fetchMember = useCallback(async () => {
		const member = await wixService.getMemberById(article.memberId as string);
		setMember(member);
	}, [article.memberId]);

	useEffect(() => {
		fetchMember();
	}, [fetchMember]);

	if (!member || !article) {
		return <ArticleCardSkeleton />;
	}

	return (
		<Link href={`/bai-viet/${article.slug}`} className='focus:outline-none'>
			<Card
				className={cn(
					"p-0 h-full border-0 overflow-hidden bg-background shadow-md transition-shadow hover:shadow-lg",
					className,
				)}>
				{/* Image and Tag Section */}
				<CardHeader className='relative h-56 p-0'>
					{/* Adjust height as needed */}
					{article.media?.wixMedia && (
						<Image
							src={
								media.getImageUrl(article.media?.wixMedia?.image as string).url
							}
							alt={`Hình ảnh cho bài viết: ${article.title}`}
							fill
							className='object-fill'
							sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
						/>
					)}
					{/* Tag positioned top-left */}
					{articleCategories && articleCategories.length > 0
						? articleCategories.map((category) => (
								<div className='absolute left-3 top-3 z-10' key={category?._id}>
									<span className='inline-block rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground'>
										{category?.label}
									</span>
								</div>
						  ))
						: null}
				</CardHeader>

				<div className='flex flex-col justify-between h-1/2'>
					{/* Content Section */}
					<CardContent className='p-4'>
						<h3 className='mb-2 line-clamp-2 font-bold leading-snug text-foreground hover:text-primary focus-visible:text-primary focus-visible:underline'>
							{article.title}
						</h3>
						<p className='mb-4 line-clamp-3 text-sm text-muted-foreground'>
							{article.excerpt}
						</p>
					</CardContent>

					{/* Footer: Author and Date */}
					<CardFooter className='flex items-center justify-between p-4 pt-0'>
						<div className='flex items-center gap-2'>
							<div className='relative h-6 w-6 overflow-hidden rounded-full'>
								<Image
									src={member?.profile?.photo?.url as string}
									alt={member?.profile?.nickname as string}
									fill
									className='object-cover'
									sizes='24px'
								/>
							</div>
							<span className='text-xs text-muted-foreground'>
								{member?.profile?.nickname}
							</span>
						</div>
						<time
							dateTime={format(article.lastPublishedDate as Date, "yyyy-MM-dd")}
							className='text-xs text-muted-foreground'>
							{format(article.lastPublishedDate as Date, "dd/MM/yyyy")}
						</time>
					</CardFooter>
				</div>
			</Card>
		</Link>
	);
}
