import { LoginData } from "@/types/auth"
import axios from "axios"

export const login = (data: LoginData) => {
  return axios.post("", data)
}