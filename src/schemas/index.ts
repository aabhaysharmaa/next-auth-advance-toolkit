import * as z from "zod";

export const LoginSchema = z.object({
	email: z.string().min(1, "Login field cannot be empty"),
	password: z.string().min(1, "Password field cannot be empty"),
})

export const RegisterSchema = z.object({
	name: z.string().min(1, "name fields is cannot be empty "),
	email: z.string().min(1, "email field cannot be empty"),
	password: z.string().min(1, "Password field cannot be empty"),
})