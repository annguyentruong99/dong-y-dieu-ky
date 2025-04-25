import Image from "next/image";
import Link from "next/link";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
// import { Button } from "./ui/button"; // Assuming Button is needed for actions later - Removed as unused

// Define the structure for article data
export interface ArticleData {
	id: string;
	title: string;
	slug: string;
	excerpt: string;
	imageUrl: string;
	tag: string;
	diseaseCategory?: string;
	author: {
		name: string;
		imageUrl: string;
	};
	date: string; // Format as needed, e.g., "DD/MM/YYYY"
}

interface ArticleCardProps {
	article: ArticleData;
	className?: string;
}

export function ArticleCard({ article, className }: ArticleCardProps) {
	return (
		<Card
			className={cn(
				"border-0 overflow-hidden bg-background shadow-md transition-shadow hover:shadow-lg",
				className,
			)}>
			{/* Image and Tag Section */}
			<CardHeader className='relative h-48 p-0'>
				{" "}
				{/* Adjust height as needed */}
				<Image
					src={article.imageUrl}
					alt={`Hình ảnh cho bài viết: ${article.title}`}
					fill
					className='object-cover'
					sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
				/>
				{/* Tag positioned top-left */}
				<div className='absolute left-3 top-3 z-10'>
					<span className='inline-block rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground'>
						{article.tag}
					</span>
				</div>
			</CardHeader>

			{/* Content Section */}
			<CardContent className='p-4'>
				<Link href={`/posts/${article.slug}`} className='focus:outline-none'>
					<h3 className='mb-2 line-clamp-2 font-bold leading-snug text-foreground hover:text-primary focus-visible:text-primary focus-visible:underline'>
						{article.title}
					</h3>
				</Link>
				<p className='mb-4 line-clamp-3 text-sm text-muted-foreground'>
					{article.excerpt}
				</p>
			</CardContent>

			{/* Footer: Author and Date */}
			<CardFooter className='flex items-center justify-between p-4 pt-0'>
				<div className='flex items-center gap-2'>
					<div className='relative h-6 w-6 overflow-hidden rounded-full'>
						<Image
							src={article.author.imageUrl}
							alt={article.author.name}
							fill
							className='object-cover'
							sizes='24px'
						/>
					</div>
					<span className='text-xs text-muted-foreground'>
						{article.author.name}
					</span>
				</div>
				<time dateTime={article.date} className='text-xs text-muted-foreground'>
					{article.date}
				</time>
			</CardFooter>
		</Card>
	);
}
 