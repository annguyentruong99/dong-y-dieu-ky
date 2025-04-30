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
import { signUpSchema } from "@/lib/validations/auth-validations";

export function SignUpForm() {
	const { signUp, isLoading } = useAuth();

	const [fullName, setFullName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState<{
		fullName?: string;
		email?: string;
		password?: string;
		confirmPassword?: string;
	}>({});

	const validateForm = () => {
		try {
			signUpSchema.parse({ fullName, email, password, confirmPassword });
			setErrors({});
			return true;
		} catch (error) {
			if (error instanceof z.ZodError) {
				const newErrors: {
					fullName?: string;
					email?: string;
					password?: string;
					confirmPassword?: string;
				} = {};

				error.errors.forEach((err) => {
					if (err.path[0] === "fullName") {
						newErrors.fullName = err.message;
					}
					if (err.path[0] === "email") {
						newErrors.email = err.message;
					}
					if (err.path[0] === "password") {
						newErrors.password = err.message;
					}
					if (err.path[0] === "confirmPassword") {
						newErrors.confirmPassword = err.message;
					}
				});

				setErrors(newErrors);
			}
			return false;
		}
	};

	const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!validateForm()) return;
		try {
			await signUp(email, password, fullName);
		} catch (error) {
			console.error("Sign up error:", error);
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
					<form onSubmit={handleSignUp} className='space-y-4'>
						{/* Full Name Input */}
						<div className='space-y-2'>
							<Label htmlFor='full-name'>Họ và tên</Label>
							<Input
								id='full-name'
								type='text'
								placeholder='Họ và tên'
								required
								value={fullName}
								onChange={(e) => setFullName(e.target.value)}
								disabled={isLoading}
								autoComplete='full-name'
							/>
							{errors.fullName && (
								<p className='text-sm text-destructive'>{errors.fullName}</p>
							)}
						</div>
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
							<Label htmlFor='password'>Mật khẩu</Label>
							<Input
								id='password'
								type='password'
								required
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								disabled={isLoading}
								autoComplete='new-password'
							/>
							{errors.password && (
								<p className='text-sm text-destructive'>{errors.password}</p>
							)}
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
								disabled={isLoading}
								autoComplete='new-password'
							/>
							{errors.confirmPassword && (
								<p className='text-sm text-destructive'>
									{errors.confirmPassword}
								</p>
							)}
						</div>
						{/* Submit Button */}
						<Button type='submit' className='w-full' disabled={isLoading}>
							{isLoading ? "Đang xử lý..." : "Đăng ký"}
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
