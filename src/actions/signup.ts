"use server"

import { LoginSchema } from "@/schemas";

export const signUp = async (values: unknown) => {
	const validatedFields = LoginSchema.safeParse(values)
	if (!validatedFields.success) {
		return { error: "Invalid Field" }
	}
	const { email, password } = validatedFields.data



}