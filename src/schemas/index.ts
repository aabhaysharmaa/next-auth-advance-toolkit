import { UserRole } from "@/generated/prisma/enums";
import * as z from "zod";

export const LoginSchema = z.object({
	email: z.string().min(1, "email field cannot be empty"),
	password: z.string().min(1, "Password field cannot be empty"),
	code: z.string().optional()
})

export const settingSchema = z.object({
	name: z.string().optional(),
	email: z.string().optional()
		.refine(
			(val) => !val || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
			{ message: "Invalid email address" }
		)
	,
	role: z.enum([UserRole.ADMIN, UserRole.USER]),
	isTwoFactorEnabled: z.boolean().optional(),
	password: z.string().optional(),
	newPassword: z.string().optional(),
}).refine((data) => {
	if (data.password && !data.newPassword) {
		return false
	}
	return true
}, { message: "New password required" }
).refine((data) => {
	if (!data.password && data.newPassword) {
		return false
	}
	return true
}, { message: "password required" }
)

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