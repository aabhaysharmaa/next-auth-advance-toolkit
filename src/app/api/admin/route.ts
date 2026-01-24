import { UserRole } from "@/generated/prisma/enums";
import { currentRole } from "@/lib/role";
import { NextResponse } from "next/server";


export async function GET() {
	const role = await currentRole();
	if (role === UserRole.USER) {
		throw new Error("Admin Only")
	}
	return new NextResponse("Success",{status : 200})
}