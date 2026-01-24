"use client";

import { setting } from "@/actions/settings";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle
} from "@/components/ui/card";

import { Error } from "@/components/error";
import { Success } from "@/components/success";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { UserRole } from "@/generated/prisma/enums";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { settingSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { SelectTrigger } from "@radix-ui/react-select";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Switch } from "@/components/ui/switch";

const SettingPage = () => {

	const { update } = useSession();
	const user = useCurrentUser();
	console.log({user})
	const [error, setError] = useState<string | undefined>("");
	const [success, setSuccess] = useState<string | undefined>("");

	const [isPending, startTransition] = useTransition()
	const form = useForm<z.infer<typeof settingSchema>>({
		resolver: zodResolver(settingSchema),
		defaultValues: {
			name: user?.name || undefined,
			email: user?.email || undefined,
			role: user?.role || undefined,
			password: undefined,
			newPassword: undefined,
			isTwoFactorEnabled : user?.isTwoFactorEnabled || undefined
		}
	})

	const onSubmit = (values: z.infer<typeof settingSchema>) => {
		setError("")
		setSuccess("")
		startTransition(() => {
			setting(values).then((data) => {
				if (data.success) {
					setSuccess(data.success)
				}
				if (data.error) {
					setError(data.error);
				}
				update();
			}).catch(() => {
				setError("something went Wrong!")
			})
		})
	}

	return (
		<Card className="w-150">
			<CardHeader>
				<CardTitle className="text-2xl font-semibold text-center">⚙️ Setting</CardTitle>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
						<div className="space-y-4">
							<FormField
								name="name"
								control={form.control}
								render={({ field }) => (
									<FormItem>
										<FormLabel>Name</FormLabel>
										<FormControl>
											<Input {...field} className="ring-0 focus-visible:ring-0 focus-visible:ring-sky-500" placeholder="John doe" />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							{user?.isOAuth === false && (
								<>
									<FormField
										name="email"
										control={form.control}
										render={({ field }) => (
											<FormItem>
												<FormLabel>Email</FormLabel>
												<FormControl>
													<Input {...field} className="ring-0 focus-visible:ring-0 focus-visible:ring-sky-500" placeholder="John doe@gmail.com" type="email" />
												</FormControl>
												<FormMessage />

											</FormItem>
										)}
									/>
									<FormField
										name="password"
										control={form.control}
										render={({ field }) => (
											<FormItem>
												<FormLabel>Password</FormLabel>
												<FormControl>
													<Input {...field} className="ring-0 focus-visible:ring-0 focus-visible:ring-sky-500" placeholder="********" type="password" />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>

									<FormField
										name="newPassword"
										control={form.control}
										render={({ field }) => (
											<FormItem>
												<FormLabel>New Password</FormLabel>
												<FormControl>
													<Input {...field} type="password" className="ring-0 focus-visible:ring-0 focus-visible:ring-sky-500" placeholder="********" />
												</FormControl>
												<FormMessage />

											</FormItem>
										)}
									/>
								</>
							)}
							<FormField
								control={form.control}
								name="role"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Role</FormLabel>

										<Select
											disabled={isPending}
											value={field.value}
											onValueChange={field.onChange}
										>
											<FormControl className="border-2  rounded-lg py-1">
												<SelectTrigger>
													<SelectValue placeholder="Select a role" />
												</SelectTrigger>
											</FormControl>

											<SelectContent>
												<SelectItem value={UserRole.ADMIN}>
													ADMIN
												</SelectItem>

												<SelectItem value={UserRole.USER}>
													USER
												</SelectItem>
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>
							{user?.isOAuth === false && (
								<FormField
									name="isTwoFactorEnabled"
									control={form.control}
									render={({ field }) => (
										<FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
											<div className="space-y-0.5">
												<FormLabel>Two Factor Authentication</FormLabel>
												<FormDescription>
													Enabled two factor authentication for your account
												</FormDescription>
											</div>
											<FormControl>
												<Switch
													disabled={isPending}
													onCheckedChange={field.onChange}
													checked={!!field.value}
												/>
											</FormControl>
										</FormItem>
									)}
								/>
							)}
						</div>
						<Success label={success} />
						<Error label={error} />
						<Button type="submit" className="w-full">
							{isPending ? <Loader2 className="animate-spin size-5" /> : "Save"}
						</Button>
					</form>
				</Form>
			</CardContent>
		</Card>
	)
}

export default SettingPage
