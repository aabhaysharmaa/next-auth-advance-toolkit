"use server";

import { getUserByEmail, getUserById } from "@/data/user";
import { currentUser } from "@/hooks/currentUser";
import { db } from "@/lib/db";
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/token";
import { settingSchema } from "@/schemas";
import bcrypt from "bcryptjs";

import * as z from "zod";

export const setting = async (values: z.infer<typeof settingSchema>) => {
	const user = await currentUser();
	if (!user || !user.id) {
		return { error: "Unauthorized!" }
	}
	const existingUser = await getUserById(user.id);
	if (!existingUser) {
		return { error: "User Not found" }
	}
	if (user.isOAuth) {
		values.email = undefined
		values.password = undefined
		values.newPassword = undefined
		values.isTwoFactorEnabled = undefined
	}

	if (values.email && values.email !== existingUser.email) {
		const existingEmail = await getUserByEmail(values.email)
		if (existingEmail && existingEmail.id !== existingUser.id) {
			return { error: "Email already in use" }
		}

		const token = await generateVerificationToken(existingUser?.email as string)
		if (!token) {
			return { error: "Something went wrong!" }
		}
		await sendVerificationEmail(token.email, token.token)
		return { success: "Verification Email Sent!" }
	}

	if (values.password && values.newPassword && existingUser.password) {
		const verifyPassword = await bcrypt.compare(values.password, existingUser.password as string)
		if (!verifyPassword) {
			return { error: "Incorrect Password" }
		}

		const hashPassword = await bcrypt.hash(values.newPassword, 10)
		values.password = hashPassword
		values.newPassword = undefined
	}

	await db.user.update({
		where: { id: existingUser.id },
		data: {
			...values
		}
	})
	return { success: "Settings Updated" }
}