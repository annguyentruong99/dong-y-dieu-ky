"use client";

import { useState } from "react";
import Link from "next/link";
import { z } from "zod";

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/auth-context";
import { loginSchema } from "@/lib/validations/auth-validations";

export function SignInForm() {
	const { signIn, isLoading } = useAuth();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errors, setErrors] = useState<{ email?: string; password?: string }>(
		{},
	);

	const validateForm = () => {
		try {
			loginSchema.parse({ email, password });
			setErrors({});
			return true;
		} catch (error) {
			if (error instanceof z.ZodError) {
				const newErrors: { email?: string; password?: string } = {};
				error.errors.forEach((err) => {
					if (err.path[0] === "email") {
						newErrors.email = err.message;
					}
					if (err.path[0] === "password") {
						newErrors.password = err.message;
					}
				});
				setErrors(newErrors);
			}
			return false;
		}
	};

	const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!validateForm()) return;
		try {
			await signIn(email, password);
		} catch (error) {
			console.error("Login error:", error);
		}
	};

	return (
		// Center the card vertically and horizontally, add padding
		<div className='flex min-h-[calc(100vh_-_theme(spacing.16)_-_theme(spacing.16))] items-center justify-center bg-background px-4 py-12 md:min-h-0 md:py-24'>
			{/* Use theme(spacing.16) for default h-16 header/footer, adjust if needed */}
			<Card className='w-full max-w-md'>
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
								disabled={isLoading}
								autoComplete='email'
							/>
							{errors.email && (
								<p className='text-sm text-destructive'>{errors.email}</p>
							)}
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
								disabled={isLoading}
								autoComplete='current-password'
							/>
							{errors.password && (
								<p className='text-sm text-destructive'>{errors.password}</p>
							)}
						</div>
						{/* Submit Button */}
						<Button type='submit' className='w-full' disabled={isLoading}>
							{isLoading ? "Đang xử lý..." : "Đăng nhập"}
						</Button>
					</form>
				</CardContent>
				<CardFooter className='text-center text-sm'>
					<p className='w-full text-muted-foreground'>
						{" "}
						{/* Added w-full for centering text */}
						Chưa có tài khoản?
						<Link
							href='/dang-ky'
							className='ml-1 font-medium text-primary hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring'>
							Đăng ký ngay
						</Link>
					</p>
				</CardFooter>
			</Card>
		</div>
	);
}
