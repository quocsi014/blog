import { axiosInstance } from "@/lib/axios"
import { LoginData, TokenPair } from "@/types/auth"

export const login  = (data: LoginData):Promise<TokenPair>=>{
  return axiosInstance.post('auth/login', data)
}