"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { CardWrapper } from "./card-wrapper";

import { newPasswordSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { newPassword } from "@/actions/new-password";
import { Success } from "../success";
import { Error } from "../error";

export const NewPasswordForm = () => {
	const params = useSearchParams();
	const token = params.get("token")
	const router = useRouter();
	const [error, setError] = useState<string | undefined>("")
	const [success, setSuccess] = useState<string | undefined>("")
	const [isPending, startTransition] = useTransition();

	const form = useForm<z.infer<typeof newPasswordSchema>>({
		resolver: zodResolver(newPasswordSchema),
		defaultValues: {
			password: ""
		}
	})

	const onSubmit = (values: z.infer<typeof newPasswordSchema>) => {
		startTransition(() => {
			newPassword(values, token as string)
				.then((data) => {
					setSuccess(data?.success)
					setError(data?.error)
					setTimeout(() => {
						router.push("/sign-in")
					}, 2000)
				})
		})
	}

	return (
		<CardWrapper backButtonHref="/sign-in" headerLabel="Enter a new password" backButtonLabel="Back to SignIn">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
					<FormField
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Password</FormLabel>
								<FormControl>
									<Input placeholder="**********" disabled={isPending} {...field} type="password" />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Success label={success as string} />
					<Error label={error} />
					<Button disabled={isPending} className="w-full cursor-pointer">Reset</Button>
				</form>
			</Form>
		</CardWrapper>
	)
}
