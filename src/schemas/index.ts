import * as z from "zod";

export const LoginSchema = z.object({
	email: z.string().min(1, "email field cannot be empty"),
	password: z.string().min(1, "Password field cannot be empty"),
	code: z.string().optional()
})

export const RegisterSchema = z.object({
	name: z.string().min(1, "name fields is cannot be empty"),
	email: z.string().min(1, "email field cannot be empty"),
	password: z.string().min(1, "Password field cannot be empty"),
})

export const newPasswordSchema = z.object({
	password: z.string().min(6, "password minimum of 6 characters required")
})
export const resetPasswordSchema = z.object({
	email: z.string().min(1, "Emails is required!")
})