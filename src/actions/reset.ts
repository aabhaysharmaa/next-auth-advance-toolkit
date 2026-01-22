"use server"

import { getUserByEmail } from "@/data/user";
import { sendVerificationEmailForResetPassword } from "@/lib/mail";
import { generatePasswordResetToken } from "@/lib/token";
import { resetPasswordSchema } from "@/schemas";
import * as z from "zod";


export const resetPassword = async (values: z.infer<typeof resetPasswordSchema>) => {
	const validateFields = resetPasswordSchema.safeParse(values)
	if (!validateFields.success) {
		return { error: "Invalid  fields" }
	}
	const { email } = validateFields.data
	const existingUser = await getUserByEmail(email)
	if (!existingUser || !existingUser.email) {
		return { error: "Email Does not exist !" }
	}
	const resetToken = await generatePasswordResetToken(existingUser.email);
	if (!resetToken?.email) {
		return { error: "Cannot generate Password" }
	}
	await sendVerificationEmailForResetPassword(resetToken?.email, resetToken?.token)
	return { success: "Reset email sent!" }
}