import { ReactNode } from "react"


interface CardWrapperProps {
	children: ReactNode
	headerLabel: string
	backButtonLabel: string
	backButtonHref: string
	showSocial: boolean
}

import {
	Card,
	CardContent,
	CardFooter,
} from "@/components/ui/card";
import { Header } from "./header"
import { Socials } from "./socials"
import { BackButton } from "./back-button"


export const CardWrapper = ({
	children,
	headerLabel,
	backButtonHref,
	backButtonLabel,
	showSocial,
}: CardWrapperProps) => {
	return (
		<Card className="w-100 shadow-md">
			<Header label={headerLabel} />
			<CardContent>
				{children}
			</CardContent>
			{showSocial && (
				<CardFooter>
					<Socials />
				</CardFooter>
			)}
			<CardFooter>
				<BackButton label={backButtonLabel} href={backButtonHref}/>
			</CardFooter>
		</Card>
	)
}
