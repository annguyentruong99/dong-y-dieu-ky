import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer"; 

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
		<html lang='vi' suppressHydrationWarning>
			{/* Added suppressHydrationWarning for potential theme issues */}
			<body
				className={`${geistSans.variable} ${geistMono.variable} flex min-h-screen flex-col antialiased`}>
				<Navbar /> {/* Use the new Navbar */}
				<main className='flex-grow'>{children}</main>{" "}
				{/* Wrap children in main and allow grow */}
				<Footer /> {/* Add the Footer */}
			</body>
		</html>
	);
}
