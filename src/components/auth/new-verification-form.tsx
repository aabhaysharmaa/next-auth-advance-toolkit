"use client";

import { newVerification } from "@/actions/new-verification";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Error } from "@/components/error";
import { Success } from "@/components/success";
import { BeatLoader } from "react-spinners";
import { CardWrapper } from "@/components/auth/card-wrapper";

export const NewVerificationForm = () => {
	const params = useSearchParams();
	const token = params.get("token");
	const [error, setError] = useState<string | undefined>("");
	const [success, setSuccess] = useState<string | undefined>("");

	const onSubmit = useCallback(() => {
		if (success || error) return

		if (!token) {
			setError("Token is missing")
			return
		}
		newVerification(token)
			.then((data) => {
				setSuccess(data?.success)
				setError(data?.error)
			})
	}, [token, error, success])

	useEffect(() => {
		// eslint-disable-next-line react-hooks/set-state-in-effect
		onSubmit();
	}, [token, onSubmit])
	return (
		<CardWrapper backButtonHref="/sign-in" backButtonLabel="Back to Login" headerLabel="Confirming your verification">
			<div className="flex items-center justify-center">
				{!success && !error && (
					<BeatLoader color="skyblue" />
				)}
				<Success label={success as string} />
				{!success && (
					<Error label={error} />
				)}
			</div>

		</CardWrapper>
	)
}


