import Link from "next/link";
import { FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; // Import Card components
import { cn } from "@/lib/utils";

interface Treatment {
	id: string;
	title: string;
	description: string;
	href: string;
}

// Dummy data - replace with actual data fetching
const treatments: Treatment[] = [
	{
		id: "t1",
		title: "Điều trị viêm xoang mãn tính",
		description: "Bệnh nhân nam, 45 tuổi, điều trị thành công sau 3 tháng",
		href: "/case-studies/viem-xoang-man-tinh",
	},
	{
		id: "t2",
		title: "Đau lưng mãn tính do thoái hóa",
		description: "Bệnh nhân nữ, 58 tuổi, cải thiện 80% sau 2 tháng",
		href: "/case-studies/dau-lung-man-tinh",
	},
	{
		id: "t3",
		title: "Rối loạn tiêu hóa kéo dài",
		description: "Bệnh nhân nam, 32 tuổi, khỏi hoàn toàn sau 1 tháng",
		href: "/case-studies/roi-loan-tieu-hoa",
	},
];

interface LatestTreatmentsCardProps {
	className?: string;
}

export function LatestTreatmentsCard({ className }: LatestTreatmentsCardProps) {
	return (
		// Use Card component with bg-muted
		<Card className={cn("bg-muted border-muted", className)}>
			<CardHeader className='flex flex-row items-center justify-between pb-4'>
				<CardTitle className='text-xl font-bold'>Y án mới nhất</CardTitle>
				<Link
					href='/case-studies'
					className='text-sm font-medium text-primary hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'>
					Xem tất cả
				</Link>
			</CardHeader>
			<CardContent>
				<div className='space-y-3'>
					{treatments.map((treatment) => (
						<Link
							key={treatment.id}
							href={treatment.href}
							// Use bg-card here for contrast against bg-muted card, or adjust as needed
							className='block rounded-md bg-background p-3 transition-colors focus:outline-none focus-visible:bg-accent/50 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1'>
							<div className='flex items-start gap-4'>
								<div className='flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md bg-secondary'>
									<FileText
										className='h-5 w-5 text-secondary-foreground'
										aria-hidden='true'
									/>
								</div>
								<div>
									<p className='font-medium text-card-foreground'>
										{treatment.title}
									</p>
									<p className='text-sm text-muted-foreground'>
										{treatment.description}
									</p>
								</div>
							</div>
						</Link>
					))}
				</div>
			</CardContent>
		</Card>
	);
}
