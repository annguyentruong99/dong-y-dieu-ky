"use client";

import * as React from "react";
import Link from "next/link";
import { resetPasswordForEmail } from "@/lib/services/auth-service";
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

export default function ForgotPasswordPage() {
	const [email, setEmail] = React.useState("");
	const [error, setError] = React.useState<string | null>(null);
	const [message, setMessage] = React.useState<string | null>(null);
	const [loading, setLoading] = React.useState(false);

	const handlePasswordReset = async (
		event: React.FormEvent<HTMLFormElement>,
	) => {
		event.preventDefault();
		setError(null);
		setMessage(null);
		setLoading(true);

		const { error: resetError } = await resetPasswordForEmail(email);

		setLoading(false);

		if (resetError) {
			console.error("Password reset error:", resetError.message);
			// Provide specific errors if possible, otherwise generic
			// Example: Check for user not found, although Supabase might not expose that directly
			setError(
				"Đã xảy ra lỗi khi gửi yêu cầu đặt lại mật khẩu. Vui lòng thử lại.",
			);
		} else {
			// Success! Show message asking user to check email
			setEmail(""); // Clear field
			setMessage(
				"Nếu email của bạn tồn tại trong hệ thống, bạn sẽ nhận được một liên kết đặt lại mật khẩu.",
			);
		}
	};

	return (
		// Center the card vertically and horizontally, add padding
		<div className='flex min-h-[calc(100vh_-_theme(spacing.16)_-_theme(spacing.16))] items-center justify-center bg-background px-4 py-12 md:min-h-0 md:py-24'>
			<Card className='w-full max-w-md'>
				<CardHeader className='text-center'>
					<CardTitle className='text-2xl font-bold'>Quên mật khẩu?</CardTitle>
					<CardDescription>
						Nhập email của bạn để nhận liên kết đặt lại mật khẩu.
					</CardDescription>
				</CardHeader>
				<CardContent>
					{/* Display success message */}
					{message && !error && (
						<div className='mb-4 rounded-md border border-blue-200 bg-blue-50 p-3 text-center text-sm text-blue-700'>
							{message}
						</div>
					)}
					<form onSubmit={handlePasswordReset} className='space-y-4'>
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
						{/* Error Message Display */}
						{error && <p className='text-sm text-destructive'>{error}</p>}
						{/* Submit Button */}
						<Button type='submit' className='w-full' disabled={loading}>
							{loading ? "Đang gửi..." : "Gửi liên kết đặt lại"}
						</Button>
					</form>
				</CardContent>
				<CardFooter className='text-center text-sm'>
					<p className='w-full text-muted-foreground'>
						Nhớ mật khẩu?
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
