import { z } from "zod";

// Schema for sign up validation
export const signUpSchema = z.object({
	fullName: z.string().min(5, "Họ và tên phải có ít nhất 5 ký tự"),
	email: z.string().email("Email không hợp lệ"),
	password: z
		.string()
		.min(8, "Mật khẩu phải có ít nhất 8 ký tự")
		.regex(/[A-Z]/, "Mật khẩu phải chứa ít nhất một chữ hoa")
		.regex(/[0-9]/, "Mật khẩu phải chứa ít nhất một số")
		.regex(/[!@#$%^&*]/, "Mật khẩu phải chứa ít nhất một ký tự đặc biệt"),
});

// Schema for login validation
export const loginSchema = z.object({
	email: z.string().email("Email không hợp lệ"),
	password: z.string().min(10, "Mật khẩu là bắt buộc"),
});

export const forgotPasswordSchema = z.object({
	email: z.string().email("Email không hợp lệ"),
});

export const resetPasswordSchema = z.object({
	password: z
		.string()
		.min(8, "Mật khẩu phải có ít nhất 8 ký tự")
		.regex(/[A-Z]/, "Mật khẩu phải chứa ít nhất một chữ hoa")
		.regex(/[0-9]/, "Mật khẩu phải chứa ít nhất một số")
		.regex(/[!@#$%^&*]/, "Mật khẩu phải chứa ít nhất một ký tự đặc biệt"),
});

export type SignUpFormData = z.infer<typeof signUpSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;