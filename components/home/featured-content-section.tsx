import { LatestTreatmentsCard } from "../latest-treatments-card";
import { FeaturedDoctorCard } from "../featured-doctor-card";
import { TopRatedArticleCard } from "../top-rated-article-card";
import { PostWithMemberAndCategory } from "@/types/posts";
import { compareDesc } from "date-fns";

interface FeaturedContentSectionProps {
	featuredPosts: PostWithMemberAndCategory[];
}

export function FeaturedContentSection({
	featuredPosts,
}: FeaturedContentSectionProps) {
	const featuredTreatments = featuredPosts
		.filter((post) =>
			post.categories?.some((category) => category?.label === "Y án"),
		)
		.sort((a, b) =>
			compareDesc(a.lastPublishedDate as Date, b.lastPublishedDate as Date),
		)
		.slice(0, 4);

	const featuredDoctors = featuredPosts
		.filter(
			(post) =>
				post.categories?.some(
					(category) => category?.label === "Câu Chuyện Bác sĩ",
				) && post.featured,
		)
		.slice(0, 4);

	const featuredArticles = featuredPosts
		.filter((post) => post.featured)
		.sort((a, b) =>
			compareDesc(a.lastPublishedDate as Date, b.lastPublishedDate as Date),
		)
		.slice(0, 4);

	return (
		<section
			aria-labelledby='featured-content-title'
			className='bg-background py-12 md:py-16 lg:py-20' // Background matches footer/other muted sections
		>
			<div className='container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
				<div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
					{/* Column 1: Y án mới nhất */}
					<LatestTreatmentsCard
						featuredTreatments={featuredTreatments}
						className='md:col-span-2 lg:col-span-1'
					/>
					{/* Column 2: Bác sĩ nổi bật */}
					<FeaturedDoctorCard
						featuredDoctors={featuredDoctors}
						className='md:col-span-2 lg:col-span-1'
					/>
					{/* Column 3: Bài viết đánh giá cao */}
					<TopRatedArticleCard
						featuredArticles={featuredArticles}
						className='md:col-span-2 lg:col-span-1'
					/>
				</div>
			</div>
		</section>
	);
}
