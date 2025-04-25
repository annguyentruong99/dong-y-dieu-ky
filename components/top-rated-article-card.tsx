import Link from "next/link";
import { Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; // Import Card components
import { cn } from "@/lib/utils";

interface Article {
	id: string;
	tag: string;
	title: string;
	description: string;
	rating: number; // e.g., 4.9
	href: string;
}

// Dummy data - replace with actual data fetching
const articles: Article[] = [
	{
		id: "a1",
		tag: "Bài thuốc",
		title: "Bài thuốc Đông Y trị mất ngủ hiệu quả",
		description:
			"Tổng hợp các bài thuốc Đông Y giúp cải thiện chất lượng giấc ngủ từ các vị thuốc tự nhiên.",
		rating: 4.9,
		href: "/posts/bai-thuoc-dong-y-tri-mat-ngu",
	},
	{
		id: "a2",
		tag: "Châm cứu",
		title: "Châm cứu điều trị đau đầu mãn tính",
		description:
			"Phương pháp châm cứu hiệu quả giúp giảm đau đầu mà không cần sử dụng thuốc tây y.",
		rating: 4.8,
		href: "/posts/cham-cuu-dieu-tri-dau-dau",
	},
	{
		id: "a3",
		tag: "Y học cổ truyền",
		title: "Cách chẩn đoán bệnh qua lưỡi",
		description:
			"Phương pháp chẩn đoán bệnh thông qua quan sát màu sắc, hình dạng và lớp phủ trên lưỡi.",
		rating: 4.7,
		href: "/posts/chan-doan-benh-qua-luoi",
	},
];

interface TopRatedArticleCardProps {
	className?: string;
}

export function TopRatedArticleCard({ className }: TopRatedArticleCardProps) {
	return (
		// Use Card component with bg-muted
		<Card className={cn("bg-muted border-muted", className)}>
			<CardHeader className='flex flex-row items-center justify-between pb-4'>
				<CardTitle className='text-xl font-bold'>
					Bài viết đánh giá cao
				</CardTitle>
				<Link
					href='/posts?sort=top-rated' // Example link to sorted posts
					className='text-sm font-medium text-primary hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'>
					Xem tất cả
				</Link>
			</CardHeader>
			<CardContent>
				<div className='space-y-3'>
					{articles.map((article) => (
						<Link
							key={article.id}
							href={article.href}
							className='block rounded-md bg-background p-3 transition-colors focus:outline-none focus-visible:bg-accent/50 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1'>
							<div className='flex flex-col gap-1.5'>
								<div className='flex items-center justify-between'>
									<span className='inline-block rounded-full bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground'>
										{article.tag}
									</span>
									<div className='flex items-center gap-1'>
										<Star className='h-4 w-4 text-primary' aria-hidden='true' />
										<span className='text-xs font-medium text-muted-foreground'>
											{article.rating.toFixed(1)}
										</span>
									</div>
								</div>
								<h4 className='font-semibold leading-snug text-card-foreground'>
									{article.title}
								</h4>
								<p className='text-md text-secondary-foreground line-clamp-2'>
									{article.description}
								</p>
							</div>
						</Link>
					))}
				</div>
			</CardContent>
		</Card>
	);
}
