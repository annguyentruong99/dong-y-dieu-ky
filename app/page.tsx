"use client";

import { HeroSection } from "@/components/home/hero-section";
import { FeaturedContentSection } from "@/components/home/featured-content-section";
import { ArticleListSection } from "@/components/home/article-list-section";
import { CtaBannerSection } from "@/components/home/cta-banner-section";

export default function Home() {
	return (
		// Main container for the page content
		<div className='flex flex-col'>
			{/* Hero Section - Takes full width */}
			<HeroSection />

			{/* Featured Content Section */}
			<FeaturedContentSection />

			{/* Article List Section */}
			<ArticleListSection />

			{/* CTA Banner Section */}
			<CtaBannerSection />
		</div>
	);
}
