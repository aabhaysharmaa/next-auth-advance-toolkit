"use client";

import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "../ui/dialog";
import { SignInform } from "./signin-form";
interface LoginButtonProps {
	children: ReactNode;
	mode?: "modal" | "redirect"
	asChild?: boolean
}

export const LoginButton = ({ mode = "redirect", asChild, children }: LoginButtonProps) => {
	const router = useRouter()
	if (mode === "modal") {
		return (
			<Dialog>
				<DialogTitle></DialogTitle>
				<DialogTrigger asChild={asChild}>
					{children}
				</DialogTrigger>
				<DialogContent className="w-110 p-8 flex items-center justify-center" >
					<SignInform />
				</DialogContent>
			</Dialog>
		)
	}

	const onClick = () => {
		router.push("/sign-in")
	}
	return (
		<span className="cursor-pointer" onClick={onClick}>
			{children}
		</span>
	)
}
