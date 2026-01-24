"use client";
import { logOut } from "@/actions/logout";
import { ReactNode } from "react";




interface LogOutButtonProps {
	children?: ReactNode
}

export const LogOutButton = ({ children }: LogOutButtonProps) => {
	const onClick = () => {
		logOut();
	}
	return (
		<span className="cursor-pointer" onClick={onClick}>{children}</span>
	)
}
