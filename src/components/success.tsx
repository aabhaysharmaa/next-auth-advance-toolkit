import { CheckCircle } from "lucide-react";

interface SuccessProps {
	label: string
}

export const Success = ({ label }: SuccessProps) => {
	if (!label) return null;
	return (
		<div className="flex items-center p-3 font-semibold text-sm bg-emerald-500/15 gap-x-2 rounded-md text-emerald-500">
			<CheckCircle className="size-4 "/>
			<p>{label}</p>
		</div>
	)
}
