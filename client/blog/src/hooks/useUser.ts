import { UserContext } from "@/app/contexts"
import { useContext } from "react"

export const useUser = ()=>{
  return useContext(UserContext)
}