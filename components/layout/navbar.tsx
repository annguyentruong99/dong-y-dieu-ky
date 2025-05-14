"use client"; // Need client component for useState

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react"; // Import useState and useEffect
import { Search, Menu, X } from "lucide-react"; // Import X for close button
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils"; // Assuming you have a utility for class names

const Navbar = () => {
	// State to control mobile menu visibility
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	// const navLinks = [
	// 	{ href: "/bai-viet", label: "Bài viết" },
	// 	{ href: "/y-an", label: "Y án" }, // Assuming slug for Y án
	// 	{ href: "/cau-chuyen-bac-si", label: "Bác sĩ" }, // Assuming slug for Bác sĩ
	// ];

	// Toggle mobile menu state
	const toggleMobileMenu = () => {
		setIsMobileMenuOpen(!isMobileMenuOpen);
	};

	// Optional: Close mobile menu on resize above md breakpoint
	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth >= 768) {
				// Tailwind's md breakpoint
				setIsMobileMenuOpen(false);
			}
		};
		window.addEventListener("resize", handleResize);
		// Cleanup listener on component unmount
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return (
		<nav className='sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-background/90'>
			<div className='container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8'>
				{/* Left Section: Logo - Always visible */}
				<div className='flex items-center'>
					<Link href='/' className='text-xl font-bold text-primary'>
						<div className='flex items-center gap-1'>
							<Image
								src='/logo.svg'
								alt='Đông Y Diệu Kỳ'
								width={40}
								height={40}
							/>
							Đông Y Diệu Kỳ
						</div>
					</Link>
				</div>

				<div className='flex items-center gap-10'>
					{/* Middle Section: Desktop Navigation Links - Hidden below md */}
					{/* <div className='hidden items-center space-x-6 lg:flex'>
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
					</div> */}

					{/* Right Section: Desktop Search and Login/Avatar - Hidden below md */}
					<div className='hidden items-center space-x-4 lg:flex'>
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
					</div>
				</div>

				{/* Mobile Menu Button - Animated Icon Swap */}
				<div className='flex items-center lg:hidden'>
					<Button
						variant='ghost'
						size='icon'
						onClick={toggleMobileMenu}
						aria-label='Toggle menu'
						aria-expanded={isMobileMenuOpen} // ARIA attribute for state
						aria-controls='mobile-menu' // ARIA attribute linking button to menu
						className='relative h-9 w-9 overflow-hidden' // Added relative and overflow-hidden
					>
						{/* Menu Icon - Animates out */}
						<Menu
							className={cn(
								"absolute h-12 w-12 transition-all duration-300 ease-in-out",
								isMobileMenuOpen
									? "opacity-0 rotate-90 scale-50"
									: "opacity-100 rotate-0 scale-100",
							)}
							aria-hidden='true'
						/>
						{/* Close Icon (X) - Animates in */}
						<X
							className={cn(
								"absolute h-12 w-12 transition-all duration-300 ease-in-out",
								isMobileMenuOpen
									? "opacity-100 rotate-0 scale-100"
									: "opacity-0 -rotate-90 scale-50",
							)}
							aria-hidden='true'
						/>
					</Button>
				</div>
			</div>

			{/* Mobile Menu - Animated Dropdown */}
			<div
				id='mobile-menu' // ID for aria-controls
				className={cn(
					// Base styles: hidden state
					"absolute inset-x-0 top-16 z-40 origin-top transform bg-background shadow-lg lg:hidden",
					"opacity-0 scale-95 transform -translate-y-2 pointer-events-none",
					// Transition styles: applies to properties changing
					"transition-all duration-300 ease-in-out motion-safe:transition-all motion-safe:delay-100",
					// Conditional styles: visible state
					isMobileMenuOpen &&
						"opacity-100 scale-100 translate-y-0 pointer-events-auto",
				)}
				// Ensure focus management if needed, especially if transitions interfere
			>
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
					{/* Mobile Navigation Links - Added focus styles */}
					{/* <div className='grid gap-y-2'>
						{navLinks.map((link) => (
							<Link
								key={link.href}
								href={link.href}
								className='block rounded-md px-3 py-2 text-base font-medium text-foreground hover:bg-accent hover:text-accent-foreground focus:outline-none focus-visible:bg-accent focus-visible:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
								onClick={() => setIsMobileMenuOpen(false)}>
								{link.label}
							</Link>
						))}
					</div> */}
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
