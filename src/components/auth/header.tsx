import { cn } from "@/lib/utils"
import { Poppins } from "next/font/google"
import { CardHeader } from "../ui/card"


const font = Poppins({
	subsets: ['latin'],
	weight: "600"
})

interface HeaderProps {
	label: string
}

export const Header = ({ label }: HeaderProps) => {
	return (
		<CardHeader className="flex items-center flex-col  w-full">
			<h1 className={cn("text-3xl font-semibold", font.className)}>🔐 Auth</h1>
			<p className="text-muted-foreground text-sm">{label}</p>
		</CardHeader>
	)
}
