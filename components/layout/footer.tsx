import Link from "next/link";
import {
	Facebook,
	Twitter,
	Instagram,
	Linkedin,
	MapPin,
	Phone,
	Mail,
	ArrowRight,
} from "lucide-react";
import { Input } from "@/components/ui/input"; // Assuming shadcn/ui Input
import { Button } from "@/components/ui/button"; // Assuming shadcn/ui Button

const Footer = () => {
	const quickLinks = [
		{ href: "/", label: "Trang chủ" },
		{ href: "/posts", label: "Bài viết" },
		{ href: "/case-studies", label: "Y án" },
		{ href: "/doctors", label: "Bác sĩ" },
		{ href: "/about", label: "Giới thiệu" }, // Added /about route
		{ href: "/contact", label: "Liên hệ" },
	];

	const popularTopics = [
		{ href: "/topics/bai-thuoc", label: "Bài thuốc Đông Y" }, // Assuming slugs
		{ href: "/topics/cham-cuu", label: "Châm cứu" },
		{ href: "/topics/xuong-khop", label: "Xương khớp" },
		{ href: "/topics/tieu-hoa", label: "Tiêu hóa" },
		{ href: "/topics/thao-duoc", label: "Thảo dược" },
		{ href: "/topics/y-hoc-co-truyen", label: "Y học cổ truyền" },
	];

	const socialLinks = [
		{ href: "#", icon: Facebook },
		{ href: "#", icon: Twitter },
		{ href: "#", icon: Instagram },
		{ href: "#", icon: Linkedin },
	];

	return (
		<footer className='bg-muted text-muted-foreground'>
			<div className='container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8'>
				<div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4'>
					{/* Column 1: Brand and Social */}
					<div className='space-y-4'>
						<Link href='/' className='text-2xl font-bold text-primary'>
							Đông Y Diệu Kỳ
						</Link>
						<p className='text-base'>
							Kết nối tri thức Đông Y cổ truyền với cuộc sống hiện đại, mang lại
							sức khỏe và cân bằng cho mọi người.
						</p>
						<div className='flex space-x-4'>
							{socialLinks.map((link, index) => (
								<Link
									key={index}
									href={link.href}
									className='text-primary hover:text-primary/80'
									aria-label={`Follow us on ${link.icon.displayName}`}>
									<link.icon className='h-5 w-5' />
								</Link>
							))}
						</div>
					</div>

					{/* Column 2: Quick Links */}
					<div>
						<h3 className='text-lg font-bold text-foreground'>
							Liên kết nhanh
						</h3>
						<ul className='mt-4 space-y-2'>
							{quickLinks.map((link) => (
								<li key={link.href}>
									<Link
										href={link.href}
										className='text-base hover:text-primary'>
										{link.label}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Column 3: Popular Topics */}
					<div>
						<h3 className='text-lg font-bold text-foreground'>
							Chủ đề phổ biến
						</h3>
						<ul className='mt-4 space-y-2'>
							{popularTopics.map((link) => (
								<li key={link.href}>
									<Link
										href={link.href}
										className='text-base hover:text-primary'>
										{link.label}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Column 4: Contact & Newsletter */}
					<div>
						<h3 className='text-base font-semibold leading-6 text-foreground'>
							Liên hệ
						</h3>
						{/* Contact List - Font sizes use rem, layout is vertical (mobile-first) */}
						<ul role='list' className='mt-4 space-y-3'>
							<li className='flex items-start space-x-3'>
								<MapPin
									className='mt-0.5 h-5 w-5 flex-shrink-0 text-primary'
									aria-hidden='true'
								/>
								<span className='text-sm leading-6 text-muted-foreground'>
									123 Đường Nguyễn Trãi, Quận 1, TP. Hồ Chí Minh
								</span>
							</li>
							<li className='flex items-center space-x-3'>
								<Phone
									className='h-5 w-5 flex-shrink-0 text-primary'
									aria-hidden='true'
								/>
								<a
									href='tel:+842812345678'
									className='text-sm leading-6 text-muted-foreground hover:text-primary'>
									(+84) 28 1234 5678
								</a>
							</li>
							<li className='flex items-center space-x-3'>
								<Mail
									className='h-5 w-5 flex-shrink-0 text-primary'
									aria-hidden='true'
								/>
								<a
									href='mailto:info@dongyviet.com'
									className='text-sm leading-6 text-muted-foreground hover:text-primary'>
									info@dongyviet.com
								</a>
							</li>
						</ul>
						{/* Newsletter Form */}
						<form className='mt-6'>
							<label htmlFor='newsletter-email' className='sr-only'>
								Đăng ký nhận bản tin
							</label>
							{/* Flex container for input + button */}
							{/* On small screens, input shrinks (flex-1 min-w-0) */}
							{/* Button retains its size (flex-shrink-0) */}
							<div className='flex gap-x-2 rounded-md shadow-sm'>
								<Input
									type='email'
									id='newsletter-email'
									required
									placeholder='Email của bạn'
									className='flex-1 min-w-0 rounded-md border-0 bg-background px-3 py-1.5 text-foreground placeholder:text-placeholder focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6'
								/>
								<Button
									type='submit'
									variant='default'
									// Ensure button padding provides adequate touch target
									className='flex-shrink-0 rounded-md bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'
									aria-label='Subscribe to newsletter'>
									<ArrowRight className='h-5 w-5' aria-hidden='true' />
								</Button>
							</div>
						</form>
					</div>
				</div>

				{/* Bottom Bar */}
				<div className='mt-12 border-t border-border pt-8'>
					<div className='flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0'>
						<p className='text-sm text-muted-foreground'>
							© {new Date().getFullYear()} DongYViet. Tất cả quyền được bảo lưu.
						</p>
						<div className='flex space-x-4 text-sm'>
							<Link
								href='/terms'
								className='text-muted-foreground hover:text-primary'>
								Điều khoản sử dụng
							</Link>
							<Link
								href='/privacy'
								className='text-muted-foreground hover:text-primary'>
								Chính sách bảo mật
							</Link>
							<Link
								href='/cookies'
								className='text-muted-foreground hover:text-primary'>
								Cookie
							</Link>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
