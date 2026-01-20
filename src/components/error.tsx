import { FaExclamationTriangle } from "react-icons/fa"

interface ErrorProps {
	label?: string
}

export const Error = ({ label }: ErrorProps) => {
	if(!label) return null ;

	return (
		<div className="flex bg-destructive/15 p-3 rounded-md items-center mt-4 space-x-2 text-sm text-destructive ">
			<FaExclamationTriangle className="size-4"/>
			<p>{label}</p>
		</div>
	)
}
