"use client";

import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Button } from "../ui/button";


export const Socials = () => {

	const handleSocial = (label: string) => {
		console.log(label)
	}

	return (
		<div className="flex items-center w-full gap-x-2">
			<Button variant="outline" size="lg" className="w-1/2" onClick={() => handleSocial("google")}>
				<FcGoogle className="size-5" />
			</Button>
			<Button variant="outline" size="lg" className="w-1/2" onClick={() => handleSocial("github")}>
				<FaGithub className="size-5" />
			</Button>
		</div>
	)
}
