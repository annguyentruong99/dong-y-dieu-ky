"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Pagination,
	PaginationContent,
	// PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";
import { List, Grid3x3 } from "lucide-react";
import { ArticleCard, type ArticleData } from "@/components/article-card"; // Assuming ArticleCard is in root components
import { cn } from "@/lib/utils";

// --- Dummy Data (Replace with API fetching) ---
const allArticles: ArticleData[] = Array.from({ length: 25 }, (_, i) => ({
	id: `article-${i + 1}`,
	title: `Bài viết mẫu ${i + 1}: Khám phá Đông Y kỳ diệu`,
	slug: `bai-viet-mau-${i + 1}`,
	excerpt:
		"Mô tả ngắn gọn về nội dung bài viết, giới thiệu về các phương pháp, thảo dược, hoặc kinh nghiệm chữa bệnh bằng Đông Y...",
	imageUrl: `/images/placeholders/article-${(i % 5) + 1}.jpg`, // Placeholder images
	tag: i % 3 === 0 ? "Bài thuốc" : i % 3 === 1 ? "Châm cứu" : "Thảo dược",
	diseaseCategory:
		i % 4 === 0
			? "Bệnh Gan - Mật"
			: i % 4 === 1
			? "Bệnh Xương Khớp"
			: i % 4 === 2
			? "Bệnh Hệ Tiêu Hóa"
			: "Nội Khoa Tạp Bệnh",
	author: {
		name: i % 2 === 0 ? "BS. Nguyễn Văn A" : "BS. Trần Thị B",
		imageUrl:
			i % 2 === 0
				? "/images/hero/author-1.png"
				: "/images/hero/author-placeholder.png",
	},
	date: `0${(i % 9) + 1}/04/2025`,
}));

const diseaseCategories = [
	"Tất cả",
	"Bệnh Gan - Mật",
	"Bệnh Thận - Tiết Niệu",
	"Bệnh Xương Khớp",
	"Bệnh Hệ Tiêu Hóa",
	"Bệnh Hệ Hô Hấp",
	"Bệnh Tim Mạch",
];

const topicCategories = [
	"Tất cả",
	"Câu chuyện châm cứu",
	"Bài thuốc Đông Y",
	"Kỹ thuật châm cứu",
	"Câu chuyện bác sĩ",
	"Thảo dược",
	"Y học cổ truyền",
];
// --- End Dummy Data ---

const ITEMS_PER_PAGE = 9; // Number of articles per page for grid view

export function ArticleListSection() {
	const [selectedDisease, setSelectedDisease] =
		React.useState<string>("Tất cả");
	const [selectedTopic, setSelectedTopic] = React.useState<string>("Tất cả");
	const [sortOrder, setSortOrder] = React.useState<string>("newest");
	const [viewMode, setViewMode] = React.useState<"grid" | "list">("grid");
	const [currentPage, setCurrentPage] = React.useState<number>(1);
	const sectionRef = React.useRef<HTMLDivElement>(null);

	// --- Filtering and Sorting Logic ---
	// Replace this with actual API calls or more complex client-side logic
	const filteredArticles = React.useMemo(() => {
		let articles = allArticles;

		// Filter by disease
		if (selectedDisease !== "Tất cả") {
			articles = articles.filter(
				(article) => article.diseaseCategory === selectedDisease,
			);
		}

		// Filter by topic (using tag as placeholder)
		if (selectedTopic !== "Tất cả") {
			// In real app, articles would have a dedicated topicCategory field
			// Using tag for demonstration
			if (selectedTopic === "Bài thuốc Đông Y")
				articles = articles.filter((a) => a.tag === "Bài thuốc");
			else if (selectedTopic === "Châm cứu")
				articles = articles.filter((a) => a.tag === "Châm cứu");
			else if (selectedTopic === "Thảo dược")
				articles = articles.filter((a) => a.tag === "Thảo dược");
			// Add other topic mappings as needed
		}

		// Sort articles
		if (sortOrder === "newest") {
			// Dummy sort by ID descending (assuming higher ID is newer)
			articles.sort(
				(a, b) => parseInt(b.id.split("-")[1]) - parseInt(a.id.split("-")[1]),
			);
		} else if (sortOrder === "oldest") {
			articles.sort(
				(a, b) => parseInt(a.id.split("-")[1]) - parseInt(b.id.split("-")[1]),
			);
		} else if (sortOrder === "popular") {
			// Add popularity sort logic if data available
		}

		return articles;
	}, [selectedDisease, selectedTopic, sortOrder]);

	// --- Pagination Logic ---
	const totalPages = Math.ceil(filteredArticles.length / ITEMS_PER_PAGE);
	const paginatedArticles = React.useMemo(() => {
		const start = (currentPage - 1) * ITEMS_PER_PAGE;
		const end = start + ITEMS_PER_PAGE;
		return filteredArticles.slice(start, end);
	}, [filteredArticles, currentPage]);

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
		sectionRef.current?.scrollIntoView({ behavior: "smooth" });
	};

	// --- Update Filter Handlers ---
	const handleDiseaseChange = (category: string) => {
		setSelectedDisease(category);
		setSelectedTopic("Tất cả"); // Reset topic filter
		setCurrentPage(1); // Reset pagination
	};

	const handleTopicChange = (category: string) => {
		setSelectedTopic(category);
		setSelectedDisease("Tất cả"); // Reset disease filter
		setCurrentPage(1); // Reset pagination
	};

	return (
		<section className='bg-muted py-12 md:py-16 lg:py-20'>
			<div
				ref={sectionRef}
				className='container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 scroll-mt-20'>
				<div className='mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
					<div className='text-center md:text-left'>
						<h2 className='text-3xl font-bold tracking-tight text-foreground sm:text-4xl'>
							Bài viết theo chủ đề
						</h2>
						<p className='mt-2 text-lg leading-8 text-muted-foreground'>
							Khám phá kho tàng kiến thức Đông Y qua các bài viết chất lượng
						</p>
					</div>

					<div className='flex flex-row items-center gap-4'>
						<div className='w-full md:w-auto'>
							<Select value={sortOrder} onValueChange={setSortOrder}>
								<SelectTrigger id='sort-order' className='w-full md:w-[180px]'>
									<SelectValue placeholder='Sắp xếp theo' />
								</SelectTrigger>
								<SelectContent className='bg-background'>
									<SelectItem value='newest'>Mới nhất</SelectItem>
									<SelectItem value='oldest'>Cũ nhất</SelectItem>
									<SelectItem value='popular'>Phổ biến</SelectItem>
								</SelectContent>
							</Select>
						</div>
						<div className='hidden md:flex flex-shrink-0 items-center space-x-1 rounded-md bg-background p-1'>
							<Button
								variant={viewMode === "grid" ? "secondary" : "ghost"}
								size='sm'
								onClick={() => setViewMode("grid")}
								aria-label='Xem dạng lưới'
								className='px-2.5' /* Adjusted padding */
							>
								<Grid3x3 className='h-4 w-4' />
							</Button>
							<Button
								variant={viewMode === "list" ? "secondary" : "ghost"}
								size='sm'
								onClick={() => setViewMode("list")}
								aria-label='Xem dạng danh sách'
								className='px-2.5' /* Adjusted padding */
							>
								<List className='h-4 w-4' />
							</Button>
						</div>
					</div>
				</div>

				{/* Filter Tags */}
				<div className='mb-8 space-y-6'>
					{/* Bệnh lý Filters */}
					<div>
						<h4 className='mb-3 text-base font-semibold text-foreground'>
							Phân loại theo bệnh lý
						</h4>
						<div className='flex flex-wrap gap-2'>
							{diseaseCategories.map((category) => (
								<Button
									key={category}
									variant={selectedDisease === category ? "default" : "outline"}
									size='sm'
									className='rounded-full'
									// Use updated handler
									onClick={() => handleDiseaseChange(category)}>
									{category}
								</Button>
							))}
						</div>
					</div>
					{/* Chủ đề Filters */}
					<div>
						<h4 className='mb-3 text-base font-semibold text-foreground'>
							Phân loại theo chủ đề Đông Y
						</h4>
						<div className='flex flex-wrap gap-2'>
							{topicCategories.map((category) => (
								<Button
									key={category}
									variant={selectedTopic === category ? "default" : "outline"}
									size='sm'
									className='rounded-full'
									// Use updated handler
									onClick={() => handleTopicChange(category)}>
									{category}
								</Button>
							))}
						</div>
					</div>
				</div>

				{/* Article List/Grid */}
				<div
					className={cn(
						"grid gap-6",
						viewMode === "grid"
							? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
							: "grid-cols-1", // List view styles (adjust if needed)
					)}>
					{paginatedArticles.length > 0 ? (
						paginatedArticles.map((article) => (
							<ArticleCard key={article.id} article={article} />
						))
					) : (
						<p className='col-span-full text-center text-muted-foreground'>
							Không tìm thấy bài viết phù hợp.
						</p>
					)}
				</div>

				{/* Pagination */}
				{totalPages > 1 && (
					<div className='mt-10 flex justify-center'>
						<Pagination>
							<PaginationContent>
								<PaginationItem>
									<PaginationPrevious
										href='#'
										onClick={(e) => {
											e.preventDefault();
											if (currentPage > 1) handlePageChange(currentPage - 1);
										}}
										aria-disabled={currentPage <= 1}
										className={
											currentPage <= 1
												? "pointer-events-none opacity-50"
												: undefined
										}
									/>
								</PaginationItem>

								{/* Basic Pagination Logic - Enhance as needed */}
								{[...Array(totalPages)].map((_, i) => {
									const page = i + 1;
									// Add logic here to show ellipsis or limit pages shown if totalPages is large
									return (
										<PaginationItem key={page}>
											<PaginationLink
												href='#'
												onClick={(e) => {
													e.preventDefault();
													handlePageChange(page);
												}}
												isActive={currentPage === page}>
												{page}
											</PaginationLink>
										</PaginationItem>
									);
								})}
								{/* Example Ellipsis - add logic to show conditionally */}
								{/* <PaginationItem>
									<PaginationEllipsis />
								</PaginationItem> */}

								<PaginationItem>
									<PaginationNext
										href='#'
										onClick={(e) => {
											e.preventDefault();
											if (currentPage < totalPages)
												handlePageChange(currentPage + 1);
										}}
										aria-disabled={currentPage >= totalPages}
										className={
											currentPage >= totalPages
												? "pointer-events-none opacity-50"
												: undefined
										}
									/>
								</PaginationItem>
							</PaginationContent>
						</Pagination>
					</div>
				)}
			</div>
		</section>
	);
}
