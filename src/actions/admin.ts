"use server"

import { UserRole } from "@/generated/prisma/enums";
import { currentRole } from "@/lib/role"


export const Admin = async () => {
	const role = await currentRole();
	if (role === UserRole.USER) {
		throw new Error("Admin only route")
	}

	return {success : "OK"}
}