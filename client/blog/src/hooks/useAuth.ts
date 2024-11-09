import { AuthContext } from "@/app/contexts";
import { useContext } from "react";


export const useAuth = () => {
  return useContext(AuthContext);
};
