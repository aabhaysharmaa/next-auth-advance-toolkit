"use server";

import { getResetPasswordTokenByToken } from "@/data/reset-password";
import { db } from "@/lib/db";
import { newPasswordSchema } from "@/schemas";
import bcrypt from "bcryptjs";
import * as z from "zod";

export const newPassword = async (values: z.infer<typeof newPasswordSchema>, token: string) => {
	const validateField = newPasswordSchema.safeParse(values);
	if (!validateField.success) {
		return { error: "Invalid fields" }
	}
	const { password } = validateField.data
	const existingToken = await getResetPasswordTokenByToken(token);
	if (!existingToken) {
		return { error: "Invalid token" }
	}
	const user = await db.user.findUnique({ where: { email: existingToken.email } })
	if (!user) {
		return { error: "User not found" }
	}
	const hasExpires = new Date(existingToken.expires) < new Date();
	if (hasExpires) {
		return { error: "Token is expired" }
	}
	const hashPassword = await bcrypt.hash(password, 10)
	await db.user.update({
		where: {
			id: user.id
		},
		data: {
			password: hashPassword
		}
	});
	return { success: "Password reset Successful" }
}