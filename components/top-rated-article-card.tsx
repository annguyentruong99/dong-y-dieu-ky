import Link from "next/link";
import { FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; // Import Card components
import { cn } from "@/lib/utils";
import { PostWithMemberAndCategory } from "@/types/posts";

interface TopRatedArticleCardProps {
	className?: string;
	featuredArticles: PostWithMemberAndCategory[];
}

export function TopRatedArticleCard({
	className,
	featuredArticles,
}: TopRatedArticleCardProps) {
	return (
		// Use Card component with bg-muted
		<Card className={cn("bg-muted border-muted", className)}>
			<CardHeader className='flex flex-row items-center justify-between pb-4'>
				<CardTitle className='text-xl font-bold'>Bài viết nổi bật</CardTitle>
				<Link
					href='/case-studies'
					className='text-sm font-medium text-primary hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'>
					Xem tất cả
				</Link>
			</CardHeader>
			<CardContent>
				<div className='space-y-3'>
					{featuredArticles.length > 0 ? (
						featuredArticles.map((article) => (
							<Link
								key={article._id}
								href={`/bai-viet/${article._id}`}
								// Use bg-card here for contrast against bg-muted card, or adjust as needed
								className='block rounded-md bg-background p-3 transition-colors focus:outline-none focus-visible:bg-accent/50 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1'>
								<div className='flex items-start gap-4'>
									<div className='flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md bg-secondary'>
										<FileText
											className='h-5 w-5 text-secondary-foreground'
											aria-hidden='true'
										/>
									</div>
									<div>
										<p className='font-medium text-card-foreground'>
											{article.title}
										</p>
										<p className='text-sm text-muted-foreground'>
											{article.excerpt}
										</p>
									</div>
								</div>
							</Link>
						))
					) : (
						<p className='text-sm text-muted-foreground'>
							Không có bài viết nào được đề xuất
						</p>
					)}
				</div>
			</CardContent>
		</Card>
	);
}
