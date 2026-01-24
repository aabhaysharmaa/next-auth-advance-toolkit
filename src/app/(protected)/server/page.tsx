import { currentUser } from "@/hooks/currentUser"

import {} from "@/components/ui/dialog" ;
import { Userinfo } from "@/lib/user-info";

const ServerPage = async() => {
	const user = await  currentUser()
	return (
	<Userinfo label="💻 Server Component" user={user}/>
	)
}

export default ServerPage
