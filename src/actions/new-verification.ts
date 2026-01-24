"use server";

import { getUserByEmail } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verification-token";
import { db } from "@/lib/db";

export const newVerification = async (token: string) => {
	try {
		const existingToken = await getVerificationTokenByToken(token);
		if (!existingToken) {
			return { error: "Invalid token" };
		}
		console.log("ExistingUser ", existingToken)
		const hasExpired = new Date(existingToken.expires) < new Date();
		if (hasExpired) {
			return { error: "Token has expired!" }
		}
		const existingUser = await getUserByEmail(existingToken.email)
		if (!existingUser) {
			return { error: "Email does not exists" }
		}
		await db.user.update({
			where: {
				id: existingUser.id
			}, data: {
				emailVerified: new Date(),
				email: existingUser.email
			}
		})
		await db.verificationToken.delete({ where: { id: existingToken.id } })
		return { success: "Token is verified!" }
	} catch (error) {
		console.log("Error in newVerification", error)
	}
}