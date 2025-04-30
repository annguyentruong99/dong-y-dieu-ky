import Link from "next/link";
import { Button } from "@/components/ui/button";

export function CtaBannerSection() {
	return (
		<section className='w-full bg-background py-12 md:py-16 lg:py-20'>
			<div className='container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
				<div className='relative overflow-hidden rounded-2xl bg-primary px-6 py-16 text-center shadow-xl sm:px-16 sm:py-24'>
					{/* Optional decorative gradient (can be uncommented if needed) */}
					{/* <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-br from-primary/80 via-primary to-primary/70 opacity-80"
          ></div> */}

					{/* Content */}
					<div className='relative z-10'>
						<h2 className='text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl'>
							Bạn là bác sĩ Đông Y?
						</h2>
						<p className='mx-auto mt-6 max-w-xl text-lg leading-8 text-primary-foreground/90'>
							Tham gia cộng đồng của chúng tôi để chia sẻ kiến thức, kinh nghiệm
							và kết nối với các đồng nghiệp trên khắp Việt Nam.
						</p>
						{/* Buttons - Stack vertically on small screens, row on sm+ */}
						<div className='mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6'>
							<Button
								asChild // Use asChild to wrap Link component
								variant='secondary' // Typically light background in shadcn
								size='lg' // Larger button for CTA
								className='rounded-full px-8 text-primary hover:bg-secondary/90'>
								<Link href='/dang-ky'>Đăng ký tài khoản</Link>
							</Button>
							<Button
								asChild
								variant='outline'
								size='lg'
								className='rounded-full border-primary-foreground/50 px-8 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground'>
								<Link href='/about-community'>Tìm hiểu thêm</Link>
							</Button>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
