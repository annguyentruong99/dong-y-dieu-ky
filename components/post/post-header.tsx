import { PostWithMemberAndCategory } from "@/types/posts";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	ChevronRight,
	Calendar,
	Clock,
	Facebook,
	Twitter,
	Linkedin,
	Link2,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { media } from "@wix/sdk";

interface PostHeaderProps {
	post: PostWithMemberAndCategory;
}

export function PostHeader({ post }: PostHeaderProps) {
	return (
		<section className='bg-muted px-4 py-6 md:px-8 md:py-8 lg:px-16 lg:py-10'>
			<div className='max-w-5xl mx-auto'>
				{/* Breadcrumb */}
				<div className='flex flex-wrap items-center gap-1 text-sm mb-6 md:mb-8'>
					<Link
						href='/bai-viet'
						className='text-[#A69B8D] hover:text-[#76614C]'>
						Bài viết
					</Link>
					<span className='flex items-center justify-center'>
						<ChevronRight size={12} className='text-[#A69B8D]' />
					</span>
					<span className='text-[#76614C] line-clamp-1'>{post.title}</span>
				</div>

				{/* Content Container */}
				<div className='flex flex-col lg:flex-row gap-6 lg:gap-8'>
					{/* Main Content */}
					<div className='flex-1 order-2 lg:order-1'>
						{/* Post Category */}
						<div className='mb-4'>
							{post.categories?.map((category) => (
								<span
									key={category?._id}
									className='inline-flex px-3 py-1 rounded-full bg-[#8B7B6B] text-white text-sm'>
									{category?.label}
								</span>
							))}
						</div>

						{/* Post Title */}
						<h1 className='text-[#5D534B] text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6'>
							{post.title}
						</h1>

						{/* Author and Meta */}
						<div className='flex flex-wrap items-center gap-3 md:gap-4 mb-6 md:mb-8 text-sm'>
							{/* Author */}
							<div className='flex items-center gap-2'>
								<Avatar className='h-8 w-8 border'>
									<AvatarImage
										src={post.member?.profile?.photo?.url}
										alt={post.member?.profile?.nickname ?? "author avatar"}
									/>
									<AvatarFallback>
										{post.member?.profile?.nickname?.[0]}
									</AvatarFallback>
								</Avatar>
								<div>
									<p className='text-[#5D534B] font-medium'>
										{post.member?.profile?.nickname}
									</p>
									<p className='text-[#A69B8D] text-xs'>
										{post.member?.profile?.title}
									</p>
								</div>
							</div>

							<span className='text-[#A69B8D]'>|</span>

							{/* Date */}
							<div className='flex items-center gap-2 text-[#A69B8D]'>
								<Calendar size={14} />
								<span>
									{format(post.lastPublishedDate as Date, "dd/MM/yyyy")}
								</span>
							</div>

							<span className='text-[#A69B8D]'>|</span>

							{/* Read Time */}
							<div className='flex items-center gap-2 text-[#A69B8D]'>
								<Clock size={14} />
								<span>{post.minutesToRead} phút đọc</span>
							</div>
						</div>

						{/* Featured Image */}
						<div className='relative w-full aspect-video rounded-xl overflow-hidden mb-6 md:mb-8'>
							<Image
								src={
									media.getImageUrl(post.media?.wixMedia?.image as string).url
								}
								alt={post.title ?? "cover image"}
								fill
								className='object-cover'
								priority
							/>
						</div>

						{/* Share and Save */}
						<div className='flex justify-between items-center mb-8 md:mb-10'>
							<div className='flex items-center gap-2'>
								<span className='text-[#A69B8D] mr-1'>Chia sẻ:</span>
								<Button
									variant='ghost'
									size='icon'
									className='rounded-full p-2 bg-[#F8F5F2] text-[#8B7B6B] hover:text-[#5D534B]'>
									<Facebook size={16} />
								</Button>
								<Button
									variant='ghost'
									size='icon'
									className='rounded-full p-2 bg-[#F8F5F2] text-[#8B7B6B] hover:text-[#5D534B]'>
									<Twitter size={16} />
								</Button>
								<Button
									variant='ghost'
									size='icon'
									className='rounded-full p-2 bg-[#F8F5F2] text-[#8B7B6B] hover:text-[#5D534B]'>
									<Linkedin size={16} />
								</Button>
								<Button
									variant='ghost'
									size='icon'
									className='rounded-full p-2 bg-[#F8F5F2] text-[#8B7B6B] hover:text-[#5D534B]'>
									<Link2 size={16} />
								</Button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
