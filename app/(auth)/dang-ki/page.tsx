"use client";

import * as React from "react";
import Link from "next/link";
// import { useRouter } from "next/navigation"; // Removed unused import
import { signUp } from "@/lib/services/auth-service";
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

export default function RegisterPage() {
	// const router = useRouter(); // Removed unused variable
	const [email, setEmail] = React.useState("");
	const [password, setPassword] = React.useState("");
	const [confirmPassword, setConfirmPassword] = React.useState("");
	const [error, setError] = React.useState<string | null>(null);
	const [message, setMessage] = React.useState<string | null>(null); // For success messages
	const [loading, setLoading] = React.useState(false);

	const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setError(null);
		setMessage(null);

		if (password !== confirmPassword) {
			setError("Mật khẩu không khớp.");
			return;
		}

		setLoading(true);

		const { error: signUpError } = await signUp({ email, password });

		setLoading(false);

		if (signUpError) {
			console.error("Sign up error:", signUpError.message);
			// Handle specific errors if needed, otherwise show generic message
			setError("Đã xảy ra lỗi khi đăng ký. Vui lòng thử lại.");
		} else {
			// Success! Show message asking user to check email
			setEmail(""); // Clear fields
			setPassword("");
			setConfirmPassword("");
			setMessage(
				"Đăng ký thành công! Vui lòng kiểm tra email của bạn để xác nhận tài khoản.",
			);
			// Optionally redirect after a delay or keep the user here
			// setTimeout(() => router.push('/dang-nhap'), 3000);
		}
	};

	return (
		<div className='flex min-h-[calc(100vh_-_theme(spacing.16)_-_theme(spacing.16))] items-center justify-center bg-background px-4 py-12 md:min-h-0 md:py-24'>
			<Card className='w-full max-w-md'>
				<CardHeader className='text-center'>
					<CardTitle className='text-2xl font-bold'>
						Đăng ký tài khoản
					</CardTitle>
					<CardDescription>Tạo tài khoản mới để bắt đầu.</CardDescription>
				</CardHeader>
				<CardContent>
					{/* Display success message */}
					{message && !error && (
						<div className='mb-4 rounded-md border border-green-200 bg-green-50 p-3 text-center text-sm text-green-700'>
							{message}
						</div>
					)}
					<form onSubmit={handleSignUp} className='space-y-4'>
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
							<Label htmlFor='password'>Mật khẩu</Label>
							<Input
								id='password'
								type='password'
								required
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								disabled={loading}
								autoComplete='new-password'
							/>
						</div>
						{/* Confirm Password Input */}
						<div className='space-y-2'>
							<Label htmlFor='confirm-password'>Xác nhận mật khẩu</Label>
							<Input
								id='confirm-password'
								type='password'
								required
								value={confirmPassword}
								onChange={(e) => setConfirmPassword(e.target.value)}
								disabled={loading}
								autoComplete='new-password'
							/>
						</div>
						{/* Error Message Display */}
						{error && <p className='text-sm text-destructive'>{error}</p>}
						{/* Submit Button */}
						<Button type='submit' className='w-full' disabled={loading}>
							{loading ? "Đang xử lý..." : "Đăng ký"}
						</Button>
					</form>
				</CardContent>
				<CardFooter className='text-center text-sm'>
					<p className='w-full text-muted-foreground'>
						Đã có tài khoản?
						<Link
							href='/dang-nhap'
							className='ml-1 font-medium text-primary hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring'>
							Đăng nhập
						</Link>
					</p>
				</CardFooter>
			</Card>
		</div>
	);
}
