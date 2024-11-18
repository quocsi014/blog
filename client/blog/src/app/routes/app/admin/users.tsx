import { AdminContentLayout } from "@/components/layout/admin-content-layout"
import { UserList } from "@/features/admin/user/component/user-list"

export const AdminUserRoute = ()=>{
  return(
    <AdminContentLayout title="Users">
      <UserList></UserList>
    </AdminContentLayout>
  )
}