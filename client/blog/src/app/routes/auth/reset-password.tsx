import { AuthLayout } from "@/components/layout/auth-layout"
import { ResetPasswordForm } from "@/features/auth/components/reset-password"

export const ResetPasswordRoute = ()=>{
  return(
    <AuthLayout title="Reset password" description="Change your password">
      <ResetPasswordForm/>
    </AuthLayout>
  )
}