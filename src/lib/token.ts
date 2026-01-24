import { getVerificationTokenByEmail } from "@/data/verification-token";
import { v6 as uuidV6 } from "uuid";
import { db } from "./db";
import { getResetPasswordTokenByEmail } from "@/data/reset-password";

export const generateVerificationToken = async (email: string) => {
	try {
		const token = uuidV6();
		const expires = new Date(new Date().getTime() + 3600 * 1000)

		const existingToken = await getVerificationTokenByEmail(email);
		if (existingToken) {
			await db.verificationToken.delete({
				where: {
					id: existingToken.id
				}
			})
		}

		const newToken = await db.verificationToken.create({
			data: {
				email,
				token,
				expires
			}
		})
		return newToken
	} catch (error) {
		console.log("Error in generateVerificationToken", error)
		return null;
	}
}

export const generatePasswordResetToken = async (email: string) => {
	try {
		const uuid = uuidV6();
		const expires = new Date(new Date().getTime() + 3600 * 1000)

		const existingToken = await getResetPasswordTokenByEmail(email);
		if (existingToken) {
			await db.passwordResetToken.delete({
				where: {
					id: existingToken.id
				}
			})
		}
		const newToken = await db.passwordResetToken.create({
			data: {
				email,
				expires,
				token: uuid
			}
		})
		return newToken
	} catch (error) {
		console.log("Error in generatePasswordResetToken", error)
		return null
	}
}