import { axiosInstance } from "@/lib/axios"
import Cookies from "js-cookie";

export const resetPassword = (data: {password: string})=>{
  const otpToken = Cookies.get('otp_token');
  const config = { headers: { Authorization: `Bearer ${otpToken}` } };
  return axiosInstance.post('auth/reset_password', data, config);
}