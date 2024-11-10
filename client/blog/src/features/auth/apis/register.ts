import { axiosInstance } from '@/lib/axios';
import Cookies from 'js-cookie';

interface registerData {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
}

export const register = (data: registerData) => {
  const otpToken = Cookies.get('otp_token');
  const config = { headers: { Authorization: `Bearer ${otpToken}` } };
  return axiosInstance.post('auth/register', data, config);
};
