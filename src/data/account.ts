import { db } from "@/lib/db";

export const getAccountByUserId = async (id: string) => {
	const account = await db.account.findUnique({ where: { id } })
	if (!account) {
		return null;
	}
	return account
}