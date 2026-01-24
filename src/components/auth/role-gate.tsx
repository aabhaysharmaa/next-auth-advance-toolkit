"use client"
import { UserRole } from "@/generated/prisma/enums";
import { useCurrentRole } from "@/hooks/use-current-role";
import { ReactNode } from "react"
import { Error } from "../error";

interface roleFateProps {
	children: ReactNode;
	allowedRole: UserRole
}

export const RoleGate = ({ children, allowedRole }: roleFateProps) => {
	const role = useCurrentRole();
	if (role !== allowedRole) {
		return (
			<Error label="You don't have permissions to view this content" />
		)
	}
	return (
		<>
			{children}
		</>
	)
}