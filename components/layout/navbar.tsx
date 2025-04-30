"use client"; // Need client component for useState

import Link from "next/link";
import { useState, useEffect } from "react"; // Import useState and useEffect
import { Search, Menu, X } from "lucide-react"; // Import X for close button
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils"; // Assuming you have a utility for class names
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context"; // Import useAuth
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"; // Import Avatar components
import { AvatarDropdown } from "@/components/avatar-dropdown";

const Navbar = () => {
	const router = useRouter();
	const { user, isLoading, signOut } = useAuth(); // Get user and loading state
	// State to control mobile menu visibility
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	const navLinks = [
		{ href: "/posts", label: "Bài viết" },
		{ href: "/case-studies", label: "Y án" }, // Assuming slug for Y án
		{ href: "/doctors", label: "Bác sĩ" }, // Assuming slug for Bác sĩ
		{ href: "/contact", label: "Liên hệ" },
	];

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

	const handleLogout = async () => await signOut();

	// Helper to get initials from email or name
	const getInitials = (email: string | undefined): string => {
		if (!email) return "U"; // Default User
		const namePart = email.split("@")[0];
		return namePart.substring(0, 2).toUpperCase();
	};

	return (
		<nav className='sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-background/90'>
			<div className='container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8'>
				{/* Left Section: Logo - Always visible */}
				<div className='flex items-center'>
					<Link href='/' className='text-2xl font-bold text-primary'>
						Đông Y Diệu Kỳ
					</Link>
				</div>

				{/* Middle Section: Desktop Navigation Links - Hidden below md */}
				<div className='hidden items-center space-x-6 lg:flex'>
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

					{/* Conditional Rendering: Login Button or User Avatar Dropdown */}
					{isLoading ? (
						// Optional: Add a loading skeleton or spinner here
						<div className='h-8 w-20 animate-pulse rounded-full bg-muted'></div>
					) : user ? (
						<AvatarDropdown
							user={user}
							avatarInitials={getInitials(user.email)}
							handleLogout={handleLogout}
						/>
					) : (
						<Button
							variant='default'
							size='sm' // Ensure Button size sm provides >44px touch target
							className='rounded-full bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90'
							onClick={() => {
								router.push("/dang-nhap");
							}}>
							Đăng nhập
						</Button>
					)}
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
					<div className='grid gap-y-2'>
						{navLinks.map((link) => (
							<Link
								key={link.href}
								href={link.href}
								className='block rounded-md px-3 py-2 text-base font-medium text-foreground hover:bg-accent hover:text-accent-foreground focus:outline-none focus-visible:bg-accent focus-visible:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
								onClick={() => setIsMobileMenuOpen(false)}>
								{link.label}
							</Link>
						))}
					</div>
					{/* Mobile Login Button OR User Info */}
					{isLoading ? (
						<div className='h-10 w-full animate-pulse rounded-md bg-muted'></div>
					) : user ? (
						<div className='border-t border-border/40 pt-4 mt-4'>
							<div className='flex items-center px-3 mb-3'>
								<Avatar className='h-8 w-8 mr-2'>
									<AvatarImage
										src={user.user_metadata?.avatar_url || ""}
										alt={user.email || "User Avatar"}
									/>
									<AvatarFallback>{getInitials(user.email)}</AvatarFallback>
								</Avatar>
								<div className='flex flex-col space-y-0.5'>
									<p className='text-sm font-medium leading-none'>
										{user.user_metadata?.full_name || "Người dùng"}
									</p>
									<p className='text-xs leading-none text-muted-foreground'>
										{user.email}
									</p>
								</div>
							</div>
							<Link
								href='/ho-so'
								className='block rounded-md px-3 py-2 text-base font-medium text-foreground hover:bg-accent hover:text-accent-foreground focus:outline-none focus-visible:bg-accent focus-visible:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
								onClick={() => setIsMobileMenuOpen(false)} // Close menu on click
							>
								Hồ sơ
							</Link>
							<Button
								variant='ghost'
								size='default'
								className='w-full justify-start rounded-md px-3 py-2 text-base font-medium text-destructive hover:bg-destructive/10 hover:text-destructive focus:outline-none focus-visible:bg-destructive/10 focus-visible:text-destructive focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
								onClick={() => {
									handleLogout();
									setIsMobileMenuOpen(false); // Close menu on click
								}}>
								Đăng xuất
							</Button>
						</div>
					) : (
						<Button
							variant='default'
							size='default' // Use default size for better touch target
							className='w-full rounded-md bg-primary text-primary-foreground hover:bg-primary/90'
							onClick={() => {
								router.push("/dang-nhap"); // Redirect to login
								setIsMobileMenuOpen(false); // Close menu on button click
							}}>
							Đăng nhập
						</Button>
					)}
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
