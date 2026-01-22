import { db } from "@/lib/db"



export const getResetPasswordTokenByEmail = async (email: string) => {
	try {
		const token = await db.passwordResetToken.findFirst({ where: { email } })
		return token
	} catch (error) {
		console.log("Error in ResetPassword", error)
		return null
	}
}

export const getResetPasswordTokenByToken = async (token: string) => {
	try {
		const existingToken  = await db.passwordResetToken.findUnique({ where: {  token  } })
		return existingToken
	} catch (error) {
		console.log("Error in ResetPassword", error)
		return null
	}
}
