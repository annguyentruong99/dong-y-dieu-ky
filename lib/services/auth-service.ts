// NOTE: This service uses the client-side Supabase client.
// For server-side actions (e.g., in Route Handlers or Server Actions),
// use the server client from `lib/supabase/server.ts`.

import { createClient } from "@/lib/supabase/client";
import type {
	SignInWithPasswordCredentials,
	// SignUpOptions - Adjusting this import/usage
	// User // Removed unused import
} from "@supabase/supabase-js";

// Get the client-side Supabase client
const supabase = createClient();

/**
 * Signs in a user with email and password.
 * @param credentials - Email and password.
 * @returns Object containing data or error.
 */
export const signInWithPassword = async (
	credentials: SignInWithPasswordCredentials,
) => {
	const { data, error } = await supabase.auth.signInWithPassword(credentials);
	// TODO: Handle profile creation/update if needed after login
	return { data, error };
};

/**
 * Signs up a new user.
 * @param email - User's email.
 * @param password - User's password.
 * @param options - Optional additional parameters like data and emailRedirectTo.
 * @returns Object containing data or error.
 */
export const signUp = async ({
	email,
	password,
	options,
}: {
	email: string;
	password: string;
	options?: { data?: Record<string, unknown>; emailRedirectTo?: string };
}) => {
	// Automatically set emailRedirectTo if not provided
	const redirectUrl =
		options?.emailRedirectTo ?? `${window.location.origin}/auth/callback`;

	const { data, error } = await supabase.auth.signUp({
		email,
		password,
		options: {
			...(options ?? {}),
			emailRedirectTo: redirectUrl,
		},
	});

	// TODO: Handle profile creation in a separate step or trigger
	// Supabase automatically creates an entry in auth.users
	// You might need a trigger or function to create the corresponding public.profiles row
	// using the data from options.data if provided.

	return { data, error };
};

/**
 * Signs out the current user.
 * @returns Object containing error if sign-out fails.
 */
export const signOut = async () => {
	const { error } = await supabase.auth.signOut();
	return { error };
};

/**
 * Sends a password reset email.
 * @param email - The user's email address.
 * @param redirectTo - Optional URL to redirect to after email link confirmation.
 * @returns Object containing error if sending fails.
 */
export const resetPasswordForEmail = async (
	email: string,
	redirectTo?: string,
) => {
	// Define the redirect URL, defaulting to a standard reset path
	const redirectUrl = redirectTo ?? `${window.location.origin}/reset-mat-khau`;

	const { error } = await supabase.auth.resetPasswordForEmail(email, {
		redirectTo: redirectUrl,
	});
	return { error };
};

/**
 * Updates the user's password. Typically used after a password reset flow.
 * Requires the user to be authenticated (e.g., via the link in the reset email).
 * @param newPassword - The new password.
 * @returns Object containing data or error.
 */
export const updatePassword = async (newPassword: string) => {
	const { data, error } = await supabase.auth.updateUser({
		password: newPassword,
	});
	return { data, error };
};

/**
 * Gets the current user session.
 * @returns Object containing data (session) or error.
 */
export const getSession = async () => {
	const { data, error } = await supabase.auth.getSession();
	return { session: data.session, error };
};

/**
 * Gets the currently logged-in user's data.
 * @returns Object containing data (user) or error.
 */
export const getUser = async () => {
	const { data, error } = await supabase.auth.getUser();
	return { user: data.user, error };
};

/**
 * Listens for changes in the authentication state.
 * @param callback - Function to execute when auth state changes.
 * @returns Subscription object with an unsubscribe method.
 */
export const onAuthStateChange = (
	callback: Parameters<typeof supabase.auth.onAuthStateChange>[0],
) => {
	const { data: subscription } = supabase.auth.onAuthStateChange(callback);
	return subscription;
};
