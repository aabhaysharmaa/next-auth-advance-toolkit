"use server";

import bcrypt from "bcryptjs";

import { db } from "@/lib/db";
import { generateVerificationToken } from "@/lib/token";
import { RegisterSchema } from "@/schemas";
import { sendVerificationEmail } from "@/lib/mail";

export const signUpAction = async (values: unknown) => {
	const validatedFields = RegisterSchema.safeParse(values)
	if (!validatedFields.success) {
		return { error: "Invalid Field" }
	}
	const { email, password, name } = validatedFields.data;
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
	const verificationToken = await generateVerificationToken(email);
	if (!verificationToken) {
		return { error: "Cannot generate token" }
	}
	await sendVerificationEmail(verificationToken?.email as string, verificationToken?.token)

	return { success: "ConformationEmail Sent!" }
}