import React, { useState, useEffect } from 'react';
import { useAuth } from './hooks/useAuth';
import styles from './App.module.scss';

import { Header } from './components/Header/Header';

import { Router } from './router';

export const App = () => {
  const { token, userId } = useAuth();

  const [isAuth, setIsAuth] = useState(!!token);

  useEffect(() => {
    setIsAuth(!!token);
  }, [token]);

  return (
    <>
      <Header />

      <Router auth={isAuth} />
    </>
  );
};
