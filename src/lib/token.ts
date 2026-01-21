import { getVerificationTokenByEmail } from "@/data/verification-token";
import { v6 as uuidV6 } from "uuid"
import { db } from "./db";


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