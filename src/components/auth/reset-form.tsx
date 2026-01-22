"use client";

import { resetPassword } from "@/actions/reset";
import { resetPasswordSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Error } from "../error";
import { Success } from "../success";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { CardWrapper } from "./card-wrapper";

export const ResetForm = () => {
	const [error, setError] = useState<string | undefined>("")
	const [success, setSuccess] = useState<string | undefined>("")
	const [isPending, startTransition] = useTransition();
	const form = useForm({
		resolver: zodResolver(resetPasswordSchema),
		defaultValues: {
			email: ""
		}
	})
	const onSubmit = (values: z.infer<typeof resetPasswordSchema>) => {
		startTransition(() => {
			resetPassword(values).then((data) => {
				setSuccess(data.success)
				setError(data.error)
			})
		})
		console.log(values);
	}
	return (
		<CardWrapper backButtonLabel="Back to SignIn" headerLabel="Reset your Password" backButtonHref="/sign-in">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
					<div className="space-y-4">
						<FormField
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input type="email" disabled={isPending} placeholder="JohnDoe@gmail.com" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<Success label={success as string} />
					<Error label={error as string} />
					<Button className="w-full">
						{isPending ? (
							<Loader2 className="animate-spin size-5" />
						) : (
							"Send reset email"
						)}
					</Button>
				</form>
			</Form>
		</CardWrapper>
	)
}
