"use server";

import { createWixServerClient } from "../wix-server";
import { GetPostsSort } from "@wix/auto_sdk_blog_posts";
/**
 * @description Get posts from Wix
 * @param cursor - The cursor to start the query from
 * @param postsPerPage - The number of posts to return
 * @param sortBy - The sort order of the posts
 * @returns The posts and the cursor to start the next query from
 */
export async function getPosts(
	postsPerPage: number,
	cursor?: string | null,
	sortBy?: GetPostsSort,
	categoryId?: string,
) {
	const wixServerClient = await createWixServerClient();

	const { posts, metaData } = await wixServerClient.posts.listPosts({
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
