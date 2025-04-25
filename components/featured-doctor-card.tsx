import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; // Import Card components
import { cn } from "@/lib/utils";

interface Doctor {
	id: string;
	name: string;
	title: string;
	imageUrl: string;
	rating: number; // e.g., 4.5
	reviewCount: number;
	href: string;
}

// Dummy data - replace with actual data fetching
const doctors: Doctor[] = [
	{
		id: "d1",
		name: "BS. Nguyễn Văn A",
		title: "Chuyên khoa Đông Y - 15 năm kinh nghiệm",
		imageUrl: "/images/hero/author-1.png", // Re-using image, replace as needed
		rating: 4.5, // Example rating
		reviewCount: 126,
		href: "/doctors/nguyen-van-a",
	},
	{
		id: "d2",
		name: "BS. Trần Thị B",
		title: "Châm cứu - Bấm huyệt - 12 năm kinh nghiệm",
		imageUrl: "/images/hero/author-placeholder.png", // Placeholder
		rating: 5,
		reviewCount: 98,
		href: "/doctors/tran-thi-b",
	},
	{
		id: "d3",
		name: "BS. Lê Văn C",
		title: "Bệnh nội khoa - 20 năm kinh nghiệm",
		imageUrl: "/images/hero/author-placeholder.png", // Placeholder
		rating: 4.0,
		reviewCount: 154,
		href: "/doctors/le-van-c",
	},
];

// Helper component to render stars
const StarRating = ({ rating }: { rating: number }) => {
	const totalStars = 5;
	const fullStars = Math.floor(rating);
	const hasHalfStar = rating % 1 !== 0; // Check for decimal
	const emptyStars = totalStars - fullStars - (hasHalfStar ? 1 : 0);

	return (
		<div className='flex items-center'>
			{[...Array(fullStars)].map((_, i) => (
				<Star key={`full-${i}`} className='h-4 w-4 fill-primary text-primary' />
			))}
			{/* Add half star logic if needed */}
			{/* {hasHalfStar && <StarHalf className="h-4 w-4 fill-primary text-primary" />} */}
			{[...Array(emptyStars)].map((_, i) => (
				<Star
					key={`empty-${i}`}
					className='h-4 w-4 fill-muted text-muted-foreground'
				/>
			))}
		</div>
	);
};

interface FeaturedDoctorCardProps {
	className?: string;
}

export function FeaturedDoctorCard({ className }: FeaturedDoctorCardProps) {
	return (
		// Use Card component with bg-muted
		<Card className={cn("bg-muted border-muted", className)}>
			<CardHeader className='flex flex-row items-center justify-between pb-4'>
				<CardTitle className='text-xl font-bold'>Bác sĩ nổi bật</CardTitle>
				<Link
					href='/doctors'
					className='text-sm font-medium text-primary hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'>
					Xem tất cả
				</Link>
			</CardHeader>
			<CardContent>
				<div className='space-y-3'>
					{doctors.map((doctor) => (
						<Link
							key={doctor.id}
							href={doctor.href}
							className='block rounded-md bg-background p-3 transition-colors focus:outline-none focus-visible:bg-accent/50 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1'>
							<div className='flex items-center gap-4'>
								<div className='relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-full'>
									<Image
										src={doctor.imageUrl}
										alt={`Ảnh đại diện ${doctor.name}`}
										fill
										className='object-cover'
										sizes='48px'
									/>
								</div>
								<div className='flex-1'>
									<p className='font-medium text-card-foreground'>
										{doctor.name}
									</p>
									<p className='text-sm text-muted-foreground'>
										{doctor.title}
									</p>
									<div className='mt-1 flex items-center gap-1'>
										<StarRating rating={doctor.rating} />
										<span className='text-xs text-muted-foreground'>
											({doctor.reviewCount})
										</span>
									</div>
								</div>
							</div>
						</Link>
					))}
				</div>
			</CardContent>
		</Card>
	);
}
