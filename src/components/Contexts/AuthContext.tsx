import { createContext, ReactChild, useEffect, useState } from 'react';
import { useAuth, UseAuthReturnProps } from '../../hooks/useAuth';

interface AuthProviderProps {
  children: ReactChild;
}

interface AuthContextProps {
  token: UseAuthReturnProps['token'];
  userId: UseAuthReturnProps['userId'];
  login: UseAuthReturnProps['login'];
  logout: UseAuthReturnProps['logout'];
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextProps | null>(null);

const AuthProvider = ({ children }: AuthProviderProps): JSX.Element => {
  const { token, userId, login, logout } = useAuth();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(!!token);
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        token,
        userId,
        login,
        logout,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
