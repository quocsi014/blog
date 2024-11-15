import { UserContext } from "@/app/contexts";
import { User } from "@/types/user";
import { ReactNode, useState } from "react";

export const UserProvider = ({children}: {children: ReactNode})=>{
  const [user, setUser] = useState<User | null>(null)
  const clearUser = ()=>{
    setUser(null)
  }
  return( 
    <UserContext.Provider value={{user, setUser, clearUser}}>
      {children}
    </UserContext.Provider>
  )
}