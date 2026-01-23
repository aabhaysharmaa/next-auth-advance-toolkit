"use server";

import { signIn } from "@/auth";
import { generate2FaToken } from "@/data/2FA-token";
import { getUserByEmail } from "@/data/user";
import { getTwoFactorFaVerificationCodeByEmail, getTwoFactorVerificationById } from "@/lib/2FA-token";
import { db } from "@/lib/db";
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
	const { email, password, code } = validateFields.data

	const existingUser = await getUserByEmail(email);

	if (!existingUser || !existingUser.email || !existingUser.password) {
		return { error: "user does not exist" }
	}
	if (!existingUser.emailVerified) {
		const verificationToken = await generateVerificationToken(existingUser.email);
		if (!verificationToken) {
			return { error: "Cannot generate token" }
		}
		await sendVerificationEmail(existingUser.email, verificationToken?.token);
		return { success: "Confirmation email sent!" }
	}
	if (existingUser.isTwoFactorEnabled && existingUser.email) {
		if (code) {
			const existingToken = await getTwoFactorFaVerificationCodeByEmail(existingUser.email)
			if (!existingToken) {
				return {
					error: "Invalid Code"
				}
			}
			const hasExpires = new Date(existingToken.expires) < new Date();
			if (hasExpires) {
				return {
					error: "Code in expired!"
				}
			}
			if (existingToken.token !== code) {
				return {
					error: "Invalid Code"
				}
			}
			await db.tokenFactorToken.delete({
				where: { id: existingToken.id }
			})

			const existingTwoFactorConfirmation = await getTwoFactorVerificationById(existingUser.id);
			if (existingTwoFactorConfirmation) {
				await db.twoFactorConfirmation.delete({
					where: {
						id: existingTwoFactorConfirmation.id
					}
				})
			}
			await db.twoFactorConfirmation.create({
				data: {
					userId: existingUser.id
				}
			})
		} else {
			const twoFaToken = await generate2FaToken(email)
			console.log({ twoFaToken })
			if (!twoFaToken) {
				return { error: "cannot generate token try again later" }
			}

			// await send2FaCodeEmail(twoFaToken?.email, twoFaToken?.token)
			return { "TwoFactor": true }
		}
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
