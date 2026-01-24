"use client";

import { useCurrentUser } from '@/hooks/useCurrentUser'
import { Userinfo } from '@/lib/user-info'


const ClientPage = () => {
	const user = useCurrentUser();
	return (
		<Userinfo user={user} label='📱 Client Component'  />
	)
}

export default ClientPage
