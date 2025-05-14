import type { Metadata } from "next";
import { GetPostsSort } from "@wix/auto_sdk_blog_posts";
import { HeroSection } from "@/components/home/hero-section";
import { FeaturedContentSection } from "@/components/home/featured-content-section";
import { CtaBannerSection } from "@/components/home/cta-banner-section";

import { getPosts } from "@/lib/wix/get-posts";
import { getCategories } from "@/lib/wix/get-categories";
import { ArticlesGrid } from "@/components/home/articles-grid";
import { getMember } from "@/lib/wix/get-member";
import { PostWithMemberAndCategory } from "@/types/posts";

export const metadata: Metadata = {
	title: "Đông Y Điều Kỳ - Khám phá kho tàng Y học Đông phương",
	description:
		"Trang thông tin Đông Y uy tín - Khám phá tinh hoa y học phương Đông qua các bài viết chuyên sâu, được nghiên cứu kỹ lưỡng.",
};

export default async function Home() {
	const ITEMS_PER_PAGE = 15; // Number of articles per page for grid view

	const [{ posts, paging }, categories] = await Promise.all([
		getPosts(ITEMS_PER_PAGE, null, GetPostsSort.PUBLISHED_DATE_DESC, undefined),
		getCategories(),
	]);

	const postsWithMemberAndCategories: PostWithMemberAndCategory[] =
		await Promise.all(
			posts.map(async (post) => {
				const member = await getMember(post.memberId!);
				const categoriesMap = post.categoryIds?.map((id) =>
					categories.find((category) => category._id === id),
				);
				return {
					...post,
					member,
					categories: categoriesMap ?? null,
				};
			}),
		);

	return (
		// Main container for the page content
		<div className='flex flex-col'>
			{/* Hero Section - Takes full width */}
			<HeroSection articles={postsWithMemberAndCategories} />

			{/* Featured Content Section */}
			<FeaturedContentSection featuredPosts={postsWithMemberAndCategories} />

			{/* Article List Section */}
			<ArticlesGrid
				itemsPerPage={ITEMS_PER_PAGE}
				initialArticles={posts}
				initialCategories={categories}
				initialCursor={paging?.cursor}
			/>

			{/* CTA Banner Section */}
			<CtaBannerSection />
		</div>
	);
}
