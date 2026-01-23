import { db } from "./db"


export const getTwoFactorFaVerificationCodeByEmail = async (email: string) => {
	try {
		return await db.tokenFactorToken.findFirst({
			where: { email }
		})
	} catch (error) {
		console.log("Error in get2FaVerificationCodeByEmail", error)
		return null
	}
}


export const getTwoFactorVerificationById = async (id: string) => {
	try {
		const token =  await db.twoFactorConfirmation.findUnique({ where: { userId : id  } })
		console.log({token})
		return token
	} catch (error) {
		console.log("Error in getTwoFactorVerificationById", error)
		return null;
	}
}