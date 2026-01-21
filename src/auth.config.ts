// import GitHub from "next-auth/providers/github"
// import Google from "next-auth/providers/google";

import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

import bcrypt from "bcryptjs";
import { getUserByEmail } from "./data/user";
import { LoginSchema } from "./schemas" ;

export default {
	providers: [
		Credentials({
			async authorize(credentials) {
				const validatedFields = LoginSchema.safeParse(credentials);
				if (validatedFields.success) {
					const { email, password } = validatedFields.data
					const user = await getUserByEmail(email);
					if (!user || !user.password) {
						return null
					}
					const checkPassword = await bcrypt.compare(password, user.password);
					if (checkPassword) return user
				}
				return null
			}
		})
	]
} satisfies NextAuthConfig