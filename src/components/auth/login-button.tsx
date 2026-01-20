"use client";

import { useRouter } from "next/navigation";
import { ReactNode } from "react";
interface LoginButtonProps {
	children: ReactNode;
	mode?: "modal" | "redirect"
	asChild?: boolean
}

export const LoginButton = ({ mode = "redirect" ,  asChild , children }: LoginButtonProps) => {
	const router = useRouter()
	if (mode === "modal") {
		return (
			<span>
				TODO : implement Modal
			</span>
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
