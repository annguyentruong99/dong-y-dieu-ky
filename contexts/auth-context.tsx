"use client";

import * as React from "react";
import type { Session, User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client"; // Use client helper
import { onAuthStateChange } from "@/lib/services/auth-service"; // Use auth service

interface AuthContextType {
	session: Session | null;
	user: User | null;
	isLoading: boolean;
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
	children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
	const [session, setSession] = React.useState<Session | null>(null);
	const [user, setUser] = React.useState<User | null>(null);
	const [isLoading, setIsLoading] = React.useState(true); // Start loading

	React.useEffect(() => {
		setIsLoading(true);
		const supabase = createClient();

		// Get initial session
		supabase.auth.getSession().then(({ data: { session } }) => {
			setSession(session);
			setUser(session?.user ?? null);
			setIsLoading(false);
		});

		// Listen for auth state changes
		const authSubscription = onAuthStateChange((event, session) => {
			setSession(session);
			setUser(session?.user ?? null);
			setIsLoading(false); // Ensure loading is false after initial check & changes
		});

		// Cleanup subscription on unmount
		return () => {
			authSubscription?.subscription.unsubscribe();
		};
	}, []);

	const value = React.useMemo(
		() => ({
			session,
			user,
			isLoading,
		}),
		[session, user, isLoading],
	);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Custom hook to use the AuthContext
export function useAuth() {
	const context = React.useContext(AuthContext);
	if (context === undefined) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
}
