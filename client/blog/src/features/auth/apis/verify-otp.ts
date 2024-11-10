import { axiosInstance } from "@/lib/axios"

export const verifyOtp = (data: {otp: string, email: string}): Promise<{token: string}>=>{
  return axiosInstance.post('auth/verify_otp', data)
}