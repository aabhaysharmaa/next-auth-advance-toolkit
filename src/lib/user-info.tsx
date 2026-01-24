import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ExtendedUser } from "../../next-auth"
import { Badge } from "@/components/ui/badge"

interface UserInfoProps {
  user?: ExtendedUser
  label: string
}

export const Userinfo = ({ user, label }: UserInfoProps) => {
  return (
    <Card className="w-150 text-center font-semibold">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">{label}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-row  border items-center justify-between rounded-lg p-3 shadow-sm">
          <p className="text-sm font-medium">ID</p>
          <p className="truncate text-sm max-w-45 bg-slate-100 rounded-md p-1 font-mono">{user?.id}</p>
        </div>
        <div className="flex flex-row border items-center justify-between rounded-lg p-3 shadow-sm">
          <p className="text-sm font-medium">Name</p>
          <p className="truncate text-sm max-w-45 bg-slate-100 rounded-md p-1 font-mono">{user?.name}</p>
        </div>
        <div className="flex flex-row border items-center justify-between rounded-lg p-3 shadow-sm">
          <p className="text-sm font-medium">Email</p>
          <p className="truncate text-sm max-w-45 bg-slate-100 rounded-md p-1 font-mono">{user?.email}</p>
        </div>
        <div className="flex flex-row border items-center justify-between rounded-lg p-3 shadow-sm">
          <p className="text-sm font-medium">Role</p>
          <p className="truncate text-sm max-w-45 bg-slate-100 rounded-md p-1 font-mono">{user?.role}</p>
        </div>
        <div className="flex flex-row border items-center justify-between rounded-lg p-3 shadow-sm">
          <p className="text-sm font-medium">Two factor Authentication</p>
      <Badge variant={user?.isTwoFactorEnabled ? "success" : "destructive"}>
        {user?.isTwoFactorEnabled ? "ON" : "OFF"}
      </Badge>
        </div>
      </CardContent>
    </Card>
  )
}
