"use client";

import * as React from "react";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";

import {
	Carousel,
	CarouselContent,
	CarouselItem,
	type CarouselApi,
} from "@/components/ui/carousel"; // Use shadcn/ui carousel
import { cn } from "@/lib/utils";

// Dummy data for carousel slides - replace with actual data source
const featuredArticles = [
	{
		tag: "Bài viết nổi bật",
		title: "Phương pháp điều trị bệnh gan theo Đông Y cổ truyền",
		description:
			"Khám phá các phương pháp điều trị bệnh gan hiệu quả từ Đông Y cổ truyền được các bác sĩ ứng dụng trong thời đại hiện đại.",
		author: {
			name: "BS. Nguyễn Văn A",
			image: "/images/hero/author-1.png", // Use downloaded image path
		},
		date: "15 tháng 4, 2025",
		readingTime: "10 phút đọc",
		imageUrl: "/images/hero/hero-featured-1.png", // Use downloaded image path
		href: "/posts/phuong-phap-dieu-tri-benh-gan", // Example link
	},
	{
		tag: "Y án kinh điển",
		title: "Chữa trị Mất Ngủ An Thần Bằng Bài Thuốc Cổ Phương",
		description:
			"Tìm hiểu y án chi tiết về việc sử dụng bài thuốc cổ phương kết hợp châm cứu để điều trị chứng mất ngủ kéo dài.",
		author: {
			name: "BS. Trần Thị B",
			image: "/images/hero/author-placeholder.png", // Placeholder - replace
		},
		date: "10 tháng 4, 2025",
		readingTime: "8 phút đọc",
		imageUrl: "/images/hero/hero-featured-placeholder-2.png", // Placeholder - replace
		href: "/case-studies/chua-tri-mat-ngu", // Example link
	},
	{
		tag: "Kỹ thuật Châm cứu",
		title: "Ứng Dụng Điện Châm Trong Điều Trị Đau Thần Kinh Tọa",
		description:
			"Phân tích hiệu quả và quy trình ứng dụng kỹ thuật điện châm tiên tiến trong việc giảm đau và phục hồi chức năng.",
		author: {
			name: "BS. Lê Văn C",
			image: "/images/hero/author-placeholder.png", // Placeholder - replace
		},
		date: "5 tháng 4, 2025",
		readingTime: "12 phút đọc",
		imageUrl: "/images/hero/hero-featured-placeholder-3.png", // Placeholder - replace
		href: "/posts/dien-cham-dieu-tri-than-kinh-toa", // Example link
	},
];

export function HeroSection() {
	const [api, setApi] = React.useState<CarouselApi>();
	const [current, setCurrent] = React.useState(0);

	// Autoplay plugin setup
	const plugin = React.useRef(
		Autoplay({ delay: 6000, stopOnInteraction: true, stopOnMouseEnter: true }),
	);

	// Update current slide index when it changes
	React.useEffect(() => {
		if (!api) {
			return;
		}
		setCurrent(api.selectedScrollSnap());

		const handleSelect = () => {
			setCurrent(api.selectedScrollSnap());
		};

		api.on("select", handleSelect);
		// Cleanup listener on component unmount
		return () => {
			api.off("select", handleSelect);
		};
	}, [api]);

	// Function to scroll to a specific slide
	const scrollTo = React.useCallback(
		(index: number) => {
			api?.scrollTo(index);
		},
		[api],
	);

	return (
		<section aria-label='Bài viết nổi bật' className='bg-muted py-6 md:py-8'>
			<div className='container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
				<Carousel
					setApi={setApi} // Get API instance
					plugins={[plugin.current]} // Add autoplay plugin
					className='w-full'
					opts={{
						loop: true,
						align: "start",
					}}>
					<CarouselContent className='-ml-4'>
						{featuredArticles.map((article, index) => (
							<CarouselItem key={index} className='pl-4'>
								{/* Slide container */}
								<div className='relative aspect-[16/9] md:aspect-[21/9] overflow-hidden rounded-lg'>
									{/* Background Image */}
									<Image
										src={article.imageUrl}
										alt={`Hình ảnh cho bài viết: ${article.title}`}
										fill
										className='object-cover transition-transform duration-500 ease-in-out group-hover:scale-105'
										priority={index === 0} // Prioritize loading the first image
										sizes='(max-width: 768px) 100vw, 80vw'
									/>
									{/* Gradient Overlay */}
									<div
										className='absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent md:bg-gradient-to-r md:from-black/60 md:to-transparent'
										aria-hidden='true'
									/>
									{/* Text Content */}
									<div className='absolute inset-0 flex flex-col justify-end p-6 sm:p-8 lg:p-12'>
										<span className='mb-2 inline-block self-start rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground sm:text-sm'>
											{article.tag}
										</span>
										<a href={article.href} className='focus:outline-none'>
											<h2 className='mt-1 text-xl font-bold text-white sm:text-2xl lg:text-4xl hover:underline focus-visible:underline'>
												{article.title}
											</h2>
										</a>
										<p className='mt-2 hidden max-w-xl text-sm text-white/90 sm:block sm:text-base'>
											{article.description}
										</p>
										{/* Author Info */}
										<div className='mt-4 flex items-center gap-x-3'>
											<div className='relative h-8 w-8 flex-shrink-0 overflow-hidden rounded-full sm:h-10 sm:w-10'>
												<Image
													src={article.author.image}
													alt={`Ảnh đại diện ${article.author.name}`}
													fill
													className='object-cover'
													sizes='40px'
												/>
											</div>
											<div>
												<p className='text-sm font-medium text-white sm:text-base'>
													{article.author.name}
												</p>
												<p className='text-xs text-white/70 sm:text-sm'>
													{article.date} &bull; {article.readingTime}
												</p>
											</div>
										</div>
									</div>
								</div>
							</CarouselItem>
						))}
					</CarouselContent>

					{/* Custom Navigation Dots */}
					<div className='absolute bottom-4 right-4 z-10 flex space-x-2 md:bottom-6 md:right-6'>
						{featuredArticles.map((_, index) => (
							<button
								key={index}
								onClick={() => scrollTo(index)}
								className={cn(
									"h-2 w-2 rounded-full bg-white transition-opacity duration-300",
									current === index
										? "opacity-100"
										: "opacity-50 hover:opacity-75",
								)}
								aria-label={`Xem bài viết ${index + 1}`}
								aria-current={current === index ? "true" : "false"}
							/>
						))}
					</div>
				</Carousel>
			</div>
		</section>
	);
}
