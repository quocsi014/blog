import { AuthLayout } from "@/components/layout/auth-layout"
import { LoginForm } from "@/features/auth/components/login-form"

export const LoginRoute = () =>{
  return(
    <AuthLayout title="Login" description="to use some features">
      <LoginForm/>
    </AuthLayout>
  )
}