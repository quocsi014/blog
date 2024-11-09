
import { createContext, Dispatch, SetStateAction } from "react";

interface AuthContextType {
  accessToken: string;
  setAccessToken: Dispatch<SetStateAction<string>>;
}

export const AuthContext = createContext<AuthContextType>({accessToken: '', setAccessToken:()=>{}});
