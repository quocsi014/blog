import { AuthLayout } from '@/components/layout/auth-layout';
import { RequestOtp } from '@/features/auth/components/request-otp';

export const RequestOtpRoute = () => {
  return (
    <AuthLayout title='Send otp' description='type your email to get otp'>
      <RequestOtp />
    </AuthLayout>
  );
};
