"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import {
	Category,
	GetPostsSort,
	Post as WixPost,
} from "@wix/auto_sdk_blog_posts";

import { cn } from "@/lib/utils";
import { wixService } from "@/lib/services/wix-service";
import { ArticleCard } from "@/components/article-card";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface ArticleGridProps {
	itemsPerPage: number;
	initialArticles: WixPost[];
	initialCategories: Category[];
	initialCursor?: string | null;
	initialCategoryId?: string | null;
}

export function ArticlesGrid({
	itemsPerPage,
	initialArticles = [],
	initialCategories = [],
	initialCursor = null,
	initialCategoryId = undefined,
}: ArticleGridProps) {
	console.log(initialCategoryId);
	const [isLoading, setIsLoading] = useState(!initialArticles.length);
	const [articles, setArticles] = useState<WixPost[]>(initialArticles);
	const [categories, setCategories] = useState<Category[]>(initialCategories);
	const [selectedCategory, setSelectedCategory] = useState<
		string | null | undefined
	>(initialCategoryId);
	const [cursor, setCursor] = useState<string | null | undefined>(
		initialCursor,
	);
	const [sortOrder, setSortOrder] = useState<GetPostsSort>(
		GetPostsSort.PUBLISHED_DATE_DESC,
	);

	const fetchArticles = useCallback(
		async (
			cursor?: string | null,
			sortOrder?: GetPostsSort,
			categoryId?: string | null,
			loadMore?: boolean,
		) => {
			setIsLoading(true);
			try {
				const { posts, paging } = await wixService.getPosts(
					itemsPerPage,
					cursor,
					sortOrder,
					categoryId,
				);

				if (loadMore) {
					setArticles((prev) => [...prev, ...posts]);
				} else {
					setArticles(posts);
				}
				setCursor(paging?.cursor);
			} catch (error) {
				console.error("Error fetching articles:", error);
			} finally {
				setIsLoading(false);
			}
		},
		[itemsPerPage],
	);

	const fetchCategories = useCallback(async () => {
		if (categories.length > 0) return; // Skip if we already have categories

		try {
			const fetchedCategories = await wixService.getCategories();
			setCategories(fetchedCategories);
		} catch (error) {
			console.error("Error fetching categories:", error);
		}
	}, [categories.length]);

	useEffect(() => {
		// Only fetch if we don't already have data from server
		if (articles.length === 0) {
			fetchArticles(null, sortOrder, selectedCategory);
		}
		if (categories.length === 0) {
			fetchCategories();
		}
	}, [
		fetchArticles,
		fetchCategories,
		articles.length,
		categories.length,
		sortOrder,
		selectedCategory,
	]);

	const topicCategories = useMemo(() => {
		return categories.filter((category) => !category.slug?.includes("bệnh"));
	}, [categories]);

	const diseaseCategories = useMemo(() => {
		return categories.filter((category) => category.slug?.includes("bệnh"));
	}, [categories]);

	const handleSortOrderChange = (newSortOrder: GetPostsSort) => {
		setSortOrder(newSortOrder);
		setCursor(null);
		fetchArticles(null, newSortOrder, selectedCategory);
	};

	const handleCategoryChange = (categoryId: string | undefined) => {
		setSelectedCategory(categoryId);
		setCursor(null);
		fetchArticles(null, sortOrder, categoryId);
	};

	const handleLoadMore = () => {
		if (cursor) {
			fetchArticles(cursor, sortOrder, selectedCategory, true);
		}
	};

	return (
		<section className='bg-muted py-12 md:py-16 lg:py-20'>
			<div className='container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 scroll-mt-20'>
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
							<Select
								value={sortOrder}
								onValueChange={(value) =>
									handleSortOrderChange(value as GetPostsSort)
								}>
								<SelectTrigger id='sort-order' className='w-full md:w-[180px]'>
									<SelectValue placeholder='Sắp xếp theo' />
								</SelectTrigger>
								<SelectContent className='bg-background'>
									<SelectItem value={GetPostsSort.PUBLISHED_DATE_DESC}>
										Mới nhất
									</SelectItem>
									<SelectItem value={GetPostsSort.PUBLISHED_DATE_ASC}>
										Cũ nhất
									</SelectItem>
								</SelectContent>
							</Select>
						</div>
					</div>
				</div>

				{/* Filter Tags */}
				<div className='mb-8 space-y-6'>
					<div>
						<Button
							variant={selectedCategory === undefined ? "default" : "outline"}
							size='sm'
							className={cn(
								"rounded-full hover:text-white hover:bg-primary",
								selectedCategory === undefined &&
									"text-white hover:text-primary hover:bg-primary/10",
							)}
							onClick={() => handleCategoryChange(undefined)}>
							Tất cả
						</Button>
					</div>
					<div>
						<h4 className='mb-3 text-base font-semibold text-foreground'>
							Phân loại theo bệnh lý
						</h4>
						<div className='flex flex-wrap gap-2'>
							{diseaseCategories.map((category) => (
								<Button
									key={category.slug || category._id}
									variant={
										selectedCategory === category._id ? "default" : "outline"
									}
									size='sm'
									className={cn(
										"rounded-full hover:text-white hover:bg-primary",
										selectedCategory === category._id &&
											"text-white hover:text-primary hover:bg-primary/10",
									)}
									onClick={() => handleCategoryChange(category._id as string)}>
									{category.label}
								</Button>
							))}
						</div>
					</div>
					<div>
						<h4 className='mb-3 text-base font-semibold text-foreground'>
							Phân loại theo chủ đề Đông Y
						</h4>
						<div className='flex flex-wrap gap-2'>
							{topicCategories.map((category) => (
								<Button
									key={category.slug || category._id}
									variant={
										selectedCategory === category._id ? "default" : "outline"
									}
									size='sm'
									className={cn(
										"rounded-full hover:text-white hover:bg-primary",
										selectedCategory === category._id &&
											"text-white hover:text-primary hover:bg-primary/10",
									)}
									onClick={() => handleCategoryChange(category._id as string)}>
									{category.label}
								</Button>
							))}
						</div>
					</div>
				</div>

				{/* Article List/Grid */}
				<div className='grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'>
					{articles.length > 0 ? (
						articles.map((article) => (
							<ArticleCard
								key={article._id}
								article={article}
								categories={categories}
							/>
						))
					) : (
						<p className='col-span-full text-center text-muted-foreground'>
							Không tìm thấy bài viết phù hợp.
						</p>
					)}
				</div>

				{!isLoading && cursor ? (
					<div className='flex justify-center mt-6'>
						<Button onClick={handleLoadMore}>Xem thêm</Button>
					</div>
				) : null}
			</div>
		</section>
	);
}
