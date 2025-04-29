import { createClient } from "@/utils/supabase/client";
import {
	SignUpFormData,
	LoginFormData,
	signUpSchema,
	loginSchema,
} from "../validations/auth-validations";

export class AuthService {
	static supabaseClient = createClient();

	/**
	 * Sign up a new user and create their profile
	 */
	static async signUp({ email, password, fullName }: SignUpFormData) {
		try {
			// Validate the input data
			signUpSchema.parse({ email, password, fullName });

			// Sign up the user with Supabase Auth
			const { data: authData, error: authError } =
				await this.supabaseClient.auth.signUp({
					email,
					password,
					options: {
						data: {
							name,
						},
					},
				});

			if (authError) {
				throw authError;
			}

			if (!authData.user) {
				throw new Error("Failed to create user account");
			}

			return { success: true, data: authData };
		} catch (error) {
			console.error("Sign up error:", error);
			return {
				success: false,
				error:
					error instanceof Error
						? error.message
						: "An unexpected error occurred",
			};
		}
	}

	/**
	 * Log in an existing user
	 */
	static async signIn({ email, password }: LoginFormData) {
		try {
			// Validate the input data
			loginSchema.parse({ email, password });

			const { data, error } = await this.supabaseClient.auth.signInWithPassword(
				{
					email,
					password,
				},
			);

			if (error) {
				throw error;
			}

			return { success: true, data };
		} catch (error) {
			console.error("Login error:", error);
			return {
				success: false,
				error:
					error instanceof Error
						? error.message
						: "An unexpected error occurred",
			};
		}
	}

	/**
	 * Log out the current user
	 */
	static async logout() {
		try {
			const { error } = await this.supabaseClient.auth.signOut();

			if (error) {
				throw error;
			}

			return { success: true };
		} catch (error) {
			console.error("Logout error:", error);
			return {
				success: false,
				error:
					error instanceof Error
						? error.message
						: "An unexpected error occurred",
			};
		}
	}

	/**
	 * Get the current authenticated user
	 */
	static async getCurrentUser() {
		try {
			const { data } = await this.supabaseClient.auth.getUser();
			return data.user;
		} catch (error) {
			console.error("Get current user error:", error);
			return null;
		}
	}
}
