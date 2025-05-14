import { wixClient } from "../wix-client";
import {
	Category,
	GetPostsSort,
	Post as WixPost,
} from "@wix/auto_sdk_blog_posts";
import { Member } from "@wix/auto_sdk_members_members";
import { Posts } from "@/types/posts";

class WixService {
	async getPosts(
		postsPerPage: number,
		cursor?: string | null,
		sortBy?: GetPostsSort,
		categoryId?: string | null,
	): Promise<Posts> {
		/**
		 * @description Get posts from Wix
		 * @param cursor - The cursor to start the query from
		 * @param postsPerPage - The number of posts to return
		 * @param sortBy - The sort order of the posts
		 * @returns The posts and the cursor to start the next query from
		 */
		const { posts, metaData } = await wixClient.posts.listPosts({
			paging: {
				limit: postsPerPage,
				cursor,
			},
			sort: sortBy,
			categoryIds: categoryId ? [categoryId] : undefined,
		});

		return {
			posts,
			paging: {
				cursor: metaData?.cursor,
			},
		};
	}

	/**
	 * @description Get a post by slug from Wix
	 * @param slug - The slug of the post
	 * @returns The post or null if the post is not found
	 */
	async getPostBySlug(slug: string): Promise<WixPost | null> {
		const { post } = await wixClient.posts.getPostBySlug(slug);
		return post ?? null;
	}

	/**
	 * @description Get all categories from Wix
	 * @returns The categories
	 */
	async getCategories(): Promise<Category[]> {
		const { categories } = await wixClient.categories.listCategories();
		return categories;
	}

	/**
	 * @description Get a member by ID from Wix
	 * @param memberId - The ID of the member
	 * @returns The member
	 */
	async getMemberById(memberId: string): Promise<Member> {
		const member = await wixClient.members.getMember(memberId);
		return member;
	}
}

export const wixService = new WixService();
