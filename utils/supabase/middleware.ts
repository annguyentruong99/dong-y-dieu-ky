import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function updateSession(request: NextRequest) {
	// Create a Supabase client configured to use cookies
	let response = NextResponse.next({ request });
	const supabase = createServerClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
		{
			cookies: {
				getAll() {
					return request.cookies.getAll();
				},
				setAll(cookiesToSet) {
					cookiesToSet.forEach(({ name, value }) =>
						request.cookies.set(name, value),
					);
					response = NextResponse.next({
						request,
					});
					cookiesToSet.forEach(({ name, value, options }) =>
						response.cookies.set(name, value, options),
					);
				},
			},
		},
	);

	// Refresh session if expired - required for Server Components
	// https://supabase.com/docs/guides/auth/auth-helpers/nextjs#managing-session-with-middleware
	const {
		data: { user },
	} = await supabase.auth.getUser();

	// Define protected routes that require authentication
	const protectedRoutes = [`/nguoi-dung`];

	// Check if the current path matches any protected route
	const isProtectedRoute = protectedRoutes.some(
		(route) =>
			request.nextUrl.pathname === route ||
			request.nextUrl.pathname.startsWith(`${route}/`),
	);

	// Auth routes should redirect to dashboard if already authenticated
	const isAuthRoute =
		request.nextUrl.pathname === "/dang-nhap" ||
		request.nextUrl.pathname === "/dang-ky" ||
		request.nextUrl.pathname === "/doi-mat-khau" ||
		request.nextUrl.pathname === "/dat-lai-mat-khau";

	// If accessing protected route and not authenticated, redirect to login
	if (isProtectedRoute && !user) {
		const redirectUrl = new URL("/dang-nhap", request.url);
		redirectUrl.searchParams.set("redirect", request.nextUrl.pathname);
		return NextResponse.redirect(redirectUrl);
	}

	// If accessing auth route while authenticated, redirect to home page
	if (isAuthRoute && user) {
		return NextResponse.redirect(new URL("/", request.url));
	}

	return response;
}
