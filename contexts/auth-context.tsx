"use client";

import {
	createContext,
	useEffect,
	useState,
	ReactNode,
	useContext,
} from "react";
import { createClient } from "@/utils/supabase/client";
import { AuthService } from "@/lib/services/auth-service";
import { useRouter } from "next/navigation";
import { User } from "@supabase/supabase-js";
import { toast } from "sonner";

interface AuthContextType {
	user: User | null;
	isLoading: boolean;
	signUp: (email: string, password: string, fullName: string) => Promise<void>;
	signIn: (email: string, password: string) => Promise<void>;
	signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function AuthProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<User | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const router = useRouter();

	const supabaseClient = createClient();

	// Initialize and set up auth state listener
	useEffect(() => {
		// Check for current session
		const checkSession = async () => {
			try {
				const {
					data: { session },
				} = await supabaseClient.auth.getSession();
				setUser(session?.user || null);
			} catch (error) {
				console.error("Error checking auth session:", error);
				setUser(null);
			} finally {
				setIsLoading(false);
			}
		};

		// Run initial check
		checkSession();

		// Set up auth state change listener
		const {
			data: { subscription },
		} = supabaseClient.auth.onAuthStateChange(async (event, session) => {
			setUser(session?.user || null);
			setIsLoading(false);
		});

		// Clean up subscription
		return () => {
			subscription.unsubscribe();
		};
	}, []);

	// Sign up function
	const signUp = async (email: string, password: string, fullName: string) => {
		try {
			setIsLoading(true);
			const result = await AuthService.signUp({
				email,
				password,
				fullName,
			});

			if (!result.success) {
				throw new Error(result.error as string);
			}

			toast.success("Tạo tài khoản thành công! Vui lòng đăng nhập.");
			router.push("/login");
		} catch (error) {
			const errorMessage =
				error instanceof Error ? error.message : "Failed to create account";
			toast.error(errorMessage);
			throw error;
		} finally {
			setIsLoading(false);
		}
	};

	// Sign in function
	const signIn = async (email: string, password: string) => {
		try {
			setIsLoading(true);
			const result = await AuthService.signIn({ email, password });

			if (!result.success) {
				throw new Error(result.error as string);
			}

			setUser(result.data?.user || null);
			toast.success("Đăng nhập thành công!");
			router.push("/");
		} catch (error) {
			const errorMessage =
				error instanceof Error ? error.message : "Failed to sign in";
			toast.error(errorMessage);
			throw error;
		} finally {
			setIsLoading(false);
		}
	};

	// Sign out function
	const signOut = async () => {
		try {
			setIsLoading(true);
			const result = await AuthService.logout();

			if (!result.success) {
				throw new Error(result.error as string);
			}

			setUser(null);
			toast.success("Đăng xuất thành công!");
		} catch (error) {
			const errorMessage =
				error instanceof Error ? error.message : "Failed to sign out";
			toast.error(errorMessage);
			throw error;
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<AuthContext.Provider value={{ user, isLoading, signUp, signIn, signOut }}>
			{children}
		</AuthContext.Provider>
	);
}

function useAuth() {
	const context = useContext(AuthContext);

	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}

	return context;
}

export { AuthContext, AuthProvider, useAuth };