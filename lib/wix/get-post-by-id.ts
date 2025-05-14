import { createWixServerClient } from "../wix-server";
import { PostFieldField } from "@wix/auto_sdk_blog_posts";

export async function getPostById(id: string) {
	const wixServerClient = await createWixServerClient();

	const post = await wixServerClient.posts.getPost(id, {
		fieldsets: [PostFieldField.RICH_CONTENT],
	});

	return post;
}
