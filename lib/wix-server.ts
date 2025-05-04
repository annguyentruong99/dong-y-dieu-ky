"use server";

import { cookies } from "next/headers";

import { createClient, OAuthStrategy } from "@wix/sdk";
import { posts, categories } from "@wix/blog";
import { members } from "@wix/members";

export const createWixServerClient = async () => {
	// Wix modules
	// Add more modules if needed
	// e.g
	// const modules = {
	//   products,
	//   collections,
	// }
	const modules = {
		posts,
		categories,
		members,
	};

	const cookieStore = await cookies();
	let accessToken;
	let refreshToken;

	try {
		accessToken = JSON.parse(cookieStore.get("accessToken")?.value ?? "{}");
		refreshToken = JSON.parse(cookieStore.get("refreshToken")?.value ?? "{}");
	} catch (error) {
		console.error("Error fetching cookies:", error);
	}

	return createClient({
		modules,
		auth: OAuthStrategy({
			clientId: process.env.WIX_CLIENT_ID!,
			tokens: {
				accessToken,
				refreshToken,
			},
		}),
	});
};
