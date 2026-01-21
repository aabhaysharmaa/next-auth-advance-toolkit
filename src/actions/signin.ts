"use server";

import { signIn } from "@/auth";
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
	return { success: "User Login Successful" }
}
