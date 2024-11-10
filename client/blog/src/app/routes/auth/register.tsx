import { AuthLayout } from "@/components/layout/auth-layout"
import { RegisterForm } from "@/features/auth/components/register-form"

export const RegisterRoute = ()=>{
  return(
    <AuthLayout title="Register" description="Enter your information to register">
      <RegisterForm/>
    </AuthLayout>
  )
}