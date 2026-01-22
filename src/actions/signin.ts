"use server";

import { signIn } from "@/auth";
import { getUserByEmail } from "@/data/user";
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/token";
import { DEFAULT_LOGIN_REDIRECT } from "@/route";
import { LoginSchema } from "@/schemas";
import { AuthError } from "next-auth";
import * as z from "zod";


export const signInAction = async (values: z.infer<typeof LoginSchema>) => {
	const validateFields = LoginSchema.safeParse(values);
	if (!validateFields.success) {
		return {
			error: "Invalid Fields"
		}
	}
	const { email, password } = validateFields.data

	const existingUser = await getUserByEmail(email);

	if (!existingUser || !existingUser.email || !existingUser.password) {
		return { error: "user does not exist" }
	}
	if (!existingUser.emailVerified) {
		const verificationToken = await generateVerificationToken(existingUser.email);
		if(!verificationToken) {
			return {error : "Cannot generate token"}
		}
		await sendVerificationEmail(existingUser.email, verificationToken?.token);
		return { success: "Confirmation email sent!" }
	}
	try {
		await signIn("credentials", {
			email, password, redirectTo: DEFAULT_LOGIN_REDIRECT
		})
	} catch (error) {
		if (error instanceof AuthError) {
			switch (error.type) {
				case "CredentialsSignin":
					return { error: "Invalid Credentials" }

				default:
					return { error: "something went Wrong" }
			}

		}
		throw error;
	}
}
