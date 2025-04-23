"use client"; // Need client component for useState

import Link from "next/link";
import { useState } from "react"; // Import useState
import { Search, Menu, X } from "lucide-react"; // Import X for close button
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils"; // Assuming you have a utility for class names

const Navbar = () => {
	// State to control mobile menu visibility
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	const navLinks = [
		{ href: "/", label: "Trang chủ" },
		{ href: "/posts", label: "Bài viết" },
		{ href: "/case-studies", label: "Y án" }, // Assuming slug for Y án
		{ href: "/doctors", label: "Bác sĩ" }, // Assuming slug for Bác sĩ
		{ href: "/contact", label: "Liên hệ" },
	];

	// Toggle mobile menu state
	const toggleMobileMenu = () => {
		setIsMobileMenuOpen(!isMobileMenuOpen);
	};

	return (
		<nav className='sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-background/60'>
			<div className='container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8'>
				{/* Left Section: Logo - Always visible */}
				<div className='flex items-center'>
					<Link href='/' className='text-2xl font-bold text-primary'>
						Đông Y Diệu Kỳ
					</Link>
				</div>

				{/* Middle Section: Desktop Navigation Links - Hidden below md */}
				<div className='hidden items-center space-x-6 md:flex'>
					{navLinks.map((link) => (
						<Link
							key={link.href}
							href={link.href}
							className='text-base font-medium text-foreground transition-colors hover:text-primary'
							// Font size uses relative unit (rem) via text-base
						>
							{link.label}
						</Link>
					))}
				</div>

				{/* Right Section: Desktop Search and Login - Hidden below md */}
				<div className='hidden items-center space-x-4 md:flex'>
					{/* Desktop Search - Hidden below sm breakpoint within this div */}
					<div className='relative hidden sm:block'>
						<Input
							type='search'
							placeholder='Tìm kiếm...'
							// Use rem/em for size implicitly via h-9 (height), pl/pr (padding)
							// Ensure Input component itself is responsive if custom
							className='h-9 w-full rounded-full bg-muted pl-8 pr-4 text-sm placeholder:text-placeholder focus-visible:ring-primary'
						/>
						{/* Search icon size is fixed but visually small */}
						<Search className='absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
					</div>
					<Button
						variant='default'
						size='sm' // Ensure Button size sm provides >44px touch target
						className='rounded-full bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90'
						// text-sm uses rem implicitly
					>
						Đăng nhập
					</Button>
				</div>

				{/* Mobile Menu Button - Visible below md breakpoint */}
				<div className='flex items-center md:hidden'>
					<Button
						variant='ghost'
						size='icon' // Ensure Button size icon provides >44px touch target
						onClick={toggleMobileMenu}
						aria-label='Toggle menu'
						className='h-9 w-9' // Explicit size for touch target
					>
						{isMobileMenuOpen ? (
							<X className='h-6 w-6' />
						) : (
							<Menu className='h-6 w-6' />
						)}
					</Button>
				</div>
			</div>

			{/* Mobile Menu - Conditionally rendered */}
			{/* Uses absolute positioning to overlay content */}
			{/* Transitions can be added for smoother open/close */}
			<div
				className={cn(
					"absolute inset-x-0 top-16 z-40 origin-top transform bg-background shadow-lg transition md:hidden",
					{
						block: isMobileMenuOpen,
						hidden: !isMobileMenuOpen,
					},
				)}>
				<div className='space-y-4 px-4 pb-4 pt-4 sm:px-6 lg:px-8'>
					{/* Mobile Search */}
					<div className='relative'>
						<Input
							type='search'
							placeholder='Tìm kiếm...'
							className='h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 pl-8 pr-4 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
						/>
						<Search className='absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
					</div>
					{/* Mobile Navigation Links */}
					<div className='grid gap-y-2'>
						{navLinks.map((link) => (
							<Link
								key={link.href}
								href={link.href}
								className='block rounded-md px-3 py-2 text-base font-medium text-foreground hover:bg-accent hover:text-accent-foreground'
								onClick={() => setIsMobileMenuOpen(false)} // Close menu on link click
							>
								{link.label}
							</Link>
						))}
					</div>
					{/* Mobile Login Button */}
					<Button
						variant='default'
						size='default' // Use default size for better touch target
						className='w-full rounded-md bg-primary text-primary-foreground hover:bg-primary/90'
						onClick={() => setIsMobileMenuOpen(false)} // Close menu on button click
					>
						Đăng nhập
					</Button>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
