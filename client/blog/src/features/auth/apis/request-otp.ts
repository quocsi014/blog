import { axiosInstance } from "@/lib/axios"

export const requestOtp = (data: {email: string}):Promise<void>=>{
  return axiosInstance.post('auth/request_otp', data)
}