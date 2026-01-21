"use server";

import bcrypt from "bcryptjs";

import { LoginSchema } from "@/schemas";
import { db } from "@/lib/db";

export const signUpAction = async (values: unknown) => {
	const validatedFields = LoginSchema.safeParse(values)
	if (!validatedFields.success) {
		return { error: "Invalid Field" }
	}
	const { email, password } = validatedFields.data;
	const hashedPassword = await bcrypt.hash(password, 10);

	const existingEmail = await db.user.findUnique({ where: { email } })
	if (existingEmail) {
		return { error: "Email already in use" }
	}

	await db.user.create({
		data: {
			email,
			password: hashedPassword
		}
	})
	// TODO : send verification email token
	return { success: "User Created" }
}