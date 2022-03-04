import React, { createContext } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

type AuthHeader = {
  headers: {
    Authorization: string
  }
}

export interface AuthValuesInterface {
  getAuthHeader(): Promise<AuthHeader>;
  nickname: string;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthContext = createContext<AuthValuesInterface>({} as AuthValuesInterface);

export const AuthProvider = ({ children }: AuthProviderProps): JSX.Element => {
  const { user, getIdTokenClaims } = useAuth0();
  let nickname: string = (user && user.nickname) ? user.nickname : 'user';

  const getAuthHeader = async (): Promise<AuthHeader> => {
    let tokenClaims = await getIdTokenClaims();
    const jwt = tokenClaims.__raw;

    const config = {
      headers: { Authorization: `Bearer ${jwt}` },
    };

    return config;
  }


  const authValues: AuthValuesInterface = {
    getAuthHeader,
    nickname
  };

  return (
    <AuthContext.Provider value={authValues}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
