import { useState, useEffect, useCallback } from 'react';

const storageName = 'userData';


export interface UseAuthReturnProps {
  token: string,
  userId: string,
  login: (token: string, id: string) => void,
  logout: () => void
}

export const useAuth = (): UseAuthReturnProps => {
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  const login = useCallback((jwtToken: string, id: string) => {
    setToken(jwtToken);
    setUserId(id);


    localStorage.setItem(
      storageName,
      JSON.stringify({
        token: jwtToken,
        userId: id,
      })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);

    localStorage.removeItem(storageName);
  }, []);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName));

    if (data && data.token) {
      const { token, userId } = data;
      login(token, userId);
    }
  }, [login]);

  return { userId, token, logout, login };
};
