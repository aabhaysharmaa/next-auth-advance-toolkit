
import { getTwoFactorFaVerificationCodeByEmail } from "@/lib/2FA-token";
import { db } from "@/lib/db";
import crypto from "crypto";


export const generate2FaToken = async (email: string) => {
	try {
		const code = crypto.randomInt(100_000, 100_000_0).toString();
		const expires = new Date(new Date().getTime() + 5 * 60 * 1000) // 5 mins

		const existingToken = await getTwoFactorFaVerificationCodeByEmail(email);
		if (existingToken) {
			await db.tokenFactorToken.delete({ where: { id: existingToken.id } })
		}
		const newToken = await db.tokenFactorToken.create({
			data: {
				email,
				token: code,
				expires
			}
		})

		console.log({newToken})
		return newToken
	} catch (error) {
		console.log("Error in generate2FaToken", error);
		return null
	}
}