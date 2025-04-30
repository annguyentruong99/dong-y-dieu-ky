"use client";

import { useState } from "react";
import Link from "next/link";

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
import { useAuth } from "@/contexts/auth-context";

export function ResetPasswordForm() {
	const { resetPassword, isLoading } = useAuth();
	const [password, setPassword] = useState("");

	const handlePasswordReset = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		await resetPassword(password);
	};

	return (
		// Center the card vertically and horizontally, add padding
		<div className='flex min-h-[calc(100vh_-_theme(spacing.16)_-_theme(spacing.16))] items-center justify-center bg-background px-4 py-12 md:min-h-0 md:py-24'>
			<Card className='w-full max-w-md'>
				<CardHeader className='text-center'>
					<CardTitle className='text-2xl font-bold'>Đặt lại mật khẩu</CardTitle>
					<CardDescription>Nhập mật khẩu mới của bạn.</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handlePasswordReset} className='space-y-4'>
						{/* Email Input */}
						<div className='space-y-2'>
							<Label htmlFor='password'>Mật khẩu mới</Label>
							<Input
								id='password'
								type='password'
								placeholder='Mật khẩu mới'
								required
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								disabled={isLoading}
								autoComplete='password'
							/>
						</div>
						{/* Submit Button */}
						<Button type='submit' className='w-full' disabled={isLoading}>
							{isLoading ? "Đang gửi..." : "Đặt lại mật khẩu"}
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
