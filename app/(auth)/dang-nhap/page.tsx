"use client";

import * as React from "react";
import Link from "next/link";
// import { useRouter } from "next/navigation"; // Removed unused import
import { signInWithPassword } from "@/lib/services/auth-service";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
	// const router = useRouter(); // Removed unused variable
	const [email, setEmail] = React.useState("");
	const [password, setPassword] = React.useState("");
	const [error, setError] = React.useState<string | null>(null);
	const [loading, setLoading] = React.useState(false);

	const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setError(null);
		setLoading(true);

		const { error: signInError } = await signInWithPassword({
			email,
			password,
		});

		setLoading(false);

		if (signInError) {
			console.error("Login error:", signInError.message);
			// Provide user-friendly error messages
			if (signInError.message.includes("Invalid login credentials")) {
				setError("Email hoặc mật khẩu không đúng.");
			} else {
				setError("Đã xảy ra lỗi khi đăng nhập. Vui lòng thử lại.");
			}
		} else {
			// Redirect to home page or dashboard after successful login
			// router.push("/"); // Navigate to home
			// Use window.location to force a full page refresh to update server session state
			window.location.href = "/";
			// Consider using router.refresh() if middleware handles redirects properly
			// router.refresh();
		}
	};

	return (
		// Center the card vertically and horizontally, add padding
		<div className='flex min-h-[calc(100vh_-_theme(spacing.16)_-_theme(spacing.16))] items-center justify-center bg-background px-4 py-12 md:min-h-0 md:py-24'>
			{/* Use theme(spacing.16) for default h-16 header/footer, adjust if needed */}
			<Card className='w-full max-w-md'>
				{" "}
				{/* Card container */}
				<CardHeader className='text-center'>
					<CardTitle className='text-2xl font-bold'>Đăng nhập</CardTitle>
					<CardDescription>
						Nhập email và mật khẩu của bạn để truy cập tài khoản.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSignIn} className='space-y-4'>
						{/* Email Input */}
						<div className='space-y-2'>
							<Label htmlFor='email'>Email</Label>
							<Input
								id='email'
								type='email'
								placeholder='ten@example.com'
								required
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								disabled={loading}
								autoComplete='email'
							/>
						</div>
						{/* Password Input */}
						<div className='space-y-2'>
							<div className='flex items-center justify-between'>
								<Label htmlFor='password'>Mật khẩu</Label>
								<Link
									href='/quen-mat-khau'
									className='text-sm font-medium text-primary hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring'>
									Quên mật khẩu?
								</Link>
							</div>
							<Input
								id='password'
								type='password'
								required
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								disabled={loading}
								autoComplete='current-password'
							/>
						</div>
						{/* Error Message Display */}
						{error && <p className='text-sm text-destructive'>{error}</p>}
						{/* Submit Button */}
						<Button type='submit' className='w-full' disabled={loading}>
							{loading ? "Đang xử lý..." : "Đăng nhập"}
						</Button>
					</form>
				</CardContent>
				<CardFooter className='text-center text-sm'>
					<p className='w-full text-muted-foreground'>
						{" "}
						{/* Added w-full for centering text */}
						Chưa có tài khoản?
						<Link
							href='/dang-ki'
							className='ml-1 font-medium text-primary hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring'>
							Đăng ký ngay
						</Link>
					</p>
				</CardFooter>
			</Card>
		</div>
	);
}
