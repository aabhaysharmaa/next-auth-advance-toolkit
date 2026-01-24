"use client";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

import {
	Avatar,
	AvatarFallback,
	AvatarImage
} from "@/components/ui/avatar";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { LogOut } from "lucide-react";
import { FaUser } from "react-icons/fa";
import { LogOutButton } from "./logout-button";



export const UserButton = () => {
	const user = useCurrentUser();
	return (
		<DropdownMenu>
			<DropdownMenuTrigger >
				<Avatar>
					<AvatarImage src={user?.image || ""} />
					<AvatarFallback className="bg-[radial-gradient(ellipse_at_top,#38bdf8,#075985)] text-white">
						<FaUser className="size-4" />
					</AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-40 " align="end" >
				<LogOutButton>
					<DropdownMenuItem>
						<LogOut/>
						LogOut
					</DropdownMenuItem>
				</LogOutButton>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
