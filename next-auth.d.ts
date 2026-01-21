import { UserRole } from "@/generated/prisma/enums";
import { DefaultSession } from "next-auth";



export type ExtendedUser = DefaultSession['user'] & {
	role: UserRole,
	emailVerified : string
}

declare module "next-auth" {
	interface Session {
		user: ExtendedUser
	}
}
