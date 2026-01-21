"use server";

import bcrypt from "bcryptjs";

import { RegisterSchema } from "@/schemas";
import { db } from "@/lib/db";
import { generateVerificationToken } from "@/lib/token";
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
	// TODO : send verification email token
	const verificationToken = await  generateVerificationToken(email);
	await sendVerificationEmail(verificationToken?.email as string,verificationToken?.token as string)

	return { success: "ConformationEmail Sent!" }
}