import { getPostById } from "@/lib/wix/get-post-by-id";
import { getMember } from "@/lib/wix/get-member";
import { getCategories } from "@/lib/wix/get-categories";
import { PostWithMemberAndCategory } from "@/types/posts";
import { PostHeader } from "@/components/post/post-header";
import { PostContent } from "@/components/post/post-content";

export default async function PostPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const post = await getPostById(id);

	if (!post) {
		return <div>Post not found</div>;
	}

	const member = await getMember(post.memberId!);
	const categories = await getCategories();

	const postWithMemberAndCategories: PostWithMemberAndCategory = {
		...post,
		member,
		categories: post.categoryIds?.map((id) =>
			categories.find((category) => category._id === id),
		),
	};

	return (
		<>
			<PostHeader post={postWithMemberAndCategories} />
			{/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
			{/* @ts-expect-error */}
			<PostContent content={postWithMemberAndCategories.richContent} />
		</>
	);
}
