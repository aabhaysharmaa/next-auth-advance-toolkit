"use client";
import { useSession } from "next-auth/react";

export const useCurrentRole = () => {
	const user = useSession();
	return user?.data?.user.role
}