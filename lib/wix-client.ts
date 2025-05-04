"use client";

import { createClient, OAuthStrategy } from "@wix/sdk";
import { posts, categories } from "@wix/blog";
import { members } from "@wix/members";
import Cookies from "js-cookie";

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

const getTokens = () => {
	if (typeof window === "undefined") {
		return {
			accessToken: null,
			refreshToken: null,
		};
	}

	try {
		const accessToken = Cookies.get("accessToken")
			? JSON.parse(Cookies.get("accessToken")!)
			: null;
		const refreshToken = Cookies.get("refreshToken")
			? JSON.parse(Cookies.get("refreshToken")!)
			: null;
		return { accessToken, refreshToken };
	} catch (error) {
		console.error("Error parsing auth tokens:", error);
		return { accessToken: null, refreshToken: null };
	}
};

const { accessToken, refreshToken } = getTokens();

export const wixClient = createClient({
	modules,
	auth: OAuthStrategy({
		clientId: process.env.WIX_CLIENT_ID!,
		tokens: {
			accessToken,
			refreshToken,
		},
	}),
});
