import React, { createContext, useContext, useState, useEffect } from 'react';
import { isAuthenticated } from './utils/auth';
import { authApi } from './api/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const isLoggedIn = isAuthenticated()
    if (isLoggedIn) {
      setIsLoggedIn(true)
    }
  }, [])

  const login = async (loginData) => {
    try {
      const { data } = await authApi.login(loginData)
      localStorage.setItem('accessToken', data.accessToken)
      setIsLoggedIn(true)
    } catch (err) {
      console.error(err)
      setIsLoggedIn(false)
    }
  }

  const logout = () => {
    setIsLoggedIn(false)
    localStorage.removeItem('accessToken')
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const { isLoggedIn } = useContext(AuthContext)
  return {
    isLoggedIn
  }
}

export { AuthContext }