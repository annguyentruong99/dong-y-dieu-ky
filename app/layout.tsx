import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer"; 
import { AuthProvider } from "@/contexts/auth-context";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	// Update title and description as needed
	title: "Đông Y Diệu Kỳ",
	description: "Kiến thức, kinh nghiệm và thông tin về Đông Y",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='vi'>
			<body
				className={`${geistSans.variable} ${geistMono.variable} flex min-h-screen flex-col antialiased`}>
				<Analytics />
				<SpeedInsights />
				<AuthProvider>
					<Navbar /> {/* Use the new Navbar */}
					<main className='flex-grow'>{children}</main>{" "}
					{/* Wrap children in main and allow grow */}
					<Footer /> {/* Add the Footer */}
				</AuthProvider>
			</body>
		</html>
	);
}
