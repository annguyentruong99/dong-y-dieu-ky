import { LatestTreatmentsCard } from "../latest-treatments-card";
import { FeaturedDoctorCard } from "../featured-doctor-card";
import { TopRatedArticleCard } from "../top-rated-article-card";

export function FeaturedContentSection() {
	return (
		<section
			aria-labelledby='featured-content-title'
			className='bg-background py-12 md:py-16 lg:py-20' // Background matches footer/other muted sections
		>
			<div className='container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
				{/* 
          Grid Layout:
          - Mobile: 1 column (default)
          - Tablet (md): 2 columns (arranged 1 then 2)
          - Desktop (lg): 3 columns
          Adjust gap as needed
        */}
				<div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
					{/* Column 1: Y án mới nhất */}
					<LatestTreatmentsCard className='md:col-span-2 lg:col-span-1' />
					{/* Column 2: Bác sĩ nổi bật */}
					<FeaturedDoctorCard />
					{/* Column 3: Bài viết đánh giá cao */}
					<TopRatedArticleCard />
				</div>
			</div>
		</section>
	);
}
