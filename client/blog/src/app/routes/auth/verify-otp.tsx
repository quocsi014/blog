import { AuthLayout } from '@/components/layout/auth-layout';
import { VerifyOtpForm } from '@/features/auth/components/verify-otp';

export const VerifyOtpRoute = () => {
  return (
    <AuthLayout
      title='Verify otp'
      description='Enter the received otp to complete the verification step'
    >
      <VerifyOtpForm />
    </AuthLayout>
  );
};
