import { User } from '@/types/user';
import { createContext, Dispatch, SetStateAction } from 'react';

interface AuthContextType {
  accessToken: string | null;
  setAccessToken: Dispatch<SetStateAction<string | null>>;
}

export const AuthContext = createContext<AuthContextType>({
  accessToken: null,
  setAccessToken: () => {},
});

interface UserContextType {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  clearUser: ()=>void
}

export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: ()=>{},
  clearUser: ()=>{}
});
