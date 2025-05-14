import { createClient, OAuthStrategy } from "@wix/sdk";
import { NextRequest, NextResponse } from "next/server";

export const middleware = async (request: NextRequest) => {
	const cookies = request.cookies;
	const response = NextResponse.next();

	if (cookies.get("accessToken")) {
		return response;
	}

	const wixClient = createClient({
		auth: OAuthStrategy({
			clientId: process.env.WIX_CLIENT_ID!,
		}),
	});

	const tokens = await wixClient.auth.generateVisitorTokens();
	response.cookies.set("accessToken", JSON.stringify(tokens.accessToken), {
		maxAge: 60 * 60 * 24,
	});
	response.cookies.set("refreshToken", JSON.stringify(tokens.refreshToken));

	return response;
};
