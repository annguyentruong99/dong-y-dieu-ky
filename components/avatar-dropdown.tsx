import { useRouter } from "next/navigation";

import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "@supabase/supabase-js";

interface IAvatarDropdown {
	user: User;
	avatarInitials: string;
	handleLogout: () => void;
}

export function AvatarDropdown({
	user,
	avatarInitials,
	handleLogout,
}: IAvatarDropdown) {
	const router = useRouter();
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant='ghost' className='relative h-8 w-8 rounded-full'>
					<Avatar className='h-8 w-8'>
						<AvatarImage
							src={user.user_metadata?.avatar_url || ""}
							alt={user.email || "User Avatar"}
						/>
						<AvatarFallback>{avatarInitials}</AvatarFallback>
					</Avatar>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				className='w-56 bg-background' // Ensure background color
				align='end'
				forceMount>
				<DropdownMenuLabel className='font-normal'>
					<div className='flex flex-col space-y-1'>
						<p className='text-sm font-medium leading-none'>
							{user.user_metadata?.full_name || "Người dùng"}
						</p>
						<p className='text-xs leading-none text-muted-foreground'>
							{user.email}
						</p>
					</div>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem onClick={() => router.push("/ho-so")}>
					Hồ sơ
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem onClick={handleLogout}>Đăng xuất</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
