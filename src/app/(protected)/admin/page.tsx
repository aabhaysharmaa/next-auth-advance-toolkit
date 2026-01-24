"use client";

import { Admin } from "@/actions/admin";
import { RoleGate } from "@/components/auth/role-gate";
import { Success } from "@/components/success";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { UserRole } from "@/generated/prisma/enums";
import { toast } from "sonner";
import axios from "axios";
import { useState, useTransition } from "react";

const AdminPage = () => {
	const [isPending, startTransition] = useTransition();
	const [isLoading, setIsLoading] = useState(false);
	const onClickServerAction = () => {
		startTransition(() => {
			Admin().then(() => {
				toast.success("Success")
			}).catch(() => {
				toast.error("Forbidden")
			})
		})

	}

	const onClickApiRequest = () => {
		setIsLoading(true);
		startTransition(() => {
			axios.get("/api/admin").then(() => {
				toast.success("Success")
			}).catch(() => {
				toast.error("Forbidden")
			}).finally(() => {
				setIsLoading(false)
			})
		})
	}

	return (
		<Card className="w-150">
			<CardHeader>
				<p className="text-2xl font-semibold text-center">🔑 Admin</p>
			</CardHeader>
			<CardContent className="space-y-4">
				<RoleGate allowedRole={UserRole.ADMIN}>
					<Success label="Welcome Admin You are allowed to view this content" />
				</RoleGate>
				<div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
					<p className="text-sm font-medium">Admin-only API Route</p>
					<Button onClick={onClickApiRequest} disabled={isLoading}>Click to Test</Button>
				</div>
				<div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
					<p className="text-sm font-medium">Admin-only Server Action</p>
					<Button onClick={onClickServerAction} disabled={isPending} >Click to Test</Button>
				</div>
			</CardContent>
		</Card>
	)
}

export default AdminPage
