import { AuthContext } from '@/app/contexts';
import { ReactNode, useState } from 'react';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  return (
    <AuthContext.Provider value={{accessToken, setAccessToken}}>
      {children}
    </AuthContext.Provider>
  );
};

