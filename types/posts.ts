import { Post as WixPost } from "@wix/auto_sdk_blog_posts";
import { Member } from "@wix/auto_sdk_members_members";
import { Category } from "@wix/auto_sdk_blog_categories";

export interface Posts {
	posts: WixPost[];
	paging: {
		cursor?: string | null;
	};
}

export type PostWithMemberAndCategory = (WixPost & {
	member: Member | null;
	categories: (Category | undefined)[] | null;
})[];
