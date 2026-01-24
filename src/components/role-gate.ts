// "use client";
import { currentUser } from "@/hooks/currentUser";

export const roleGate = async () => {
	const user = await currentUser();
	return user?.role
}
