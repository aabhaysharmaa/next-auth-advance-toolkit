"use server";

import bcrypt from "bcryptjs";

import { RegisterSchema } from "@/schemas";
import { db } from "@/lib/db";

export const signUpAction = async (values: unknown) => {
	const validatedFields = RegisterSchema.safeParse(values)
	if (!validatedFields.success) {
		return { error: "Invalid Field" }
	}
	const { email, password , name } = validatedFields.data;
	const hashedPassword = await bcrypt.hash(password, 10);

	const existingEmail = await db.user.findUnique({ where: { email } })
	if (existingEmail) {
		return { error: "Email already in use" }
	}

	await db.user.create({
		data: {
			email,
			name,
			password: hashedPassword
		}
	})
	// TODO : send verification email token
	return { success: "User Created" }
}