import React, { createContext, useContext, useEffect, useState } from 'react';
import { authApi } from './api/auth';
import { isAuthenticated } from './utils/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [status, setStatus] = useState('PENDING')
  useEffect(() => {
    const isUserAuthenticated = isAuthenticated()
    if (isUserAuthenticated) {
      setStatus('SUCCESS')
    } else {
      setStatus('UNAUTHORIZED')
    }
  }, [])

  const login = async (loginData) => {
    try {
      const { data } = await authApi.login(loginData)
      localStorage.setItem('accessToken', data.accessToken)
      setStatus('SUCCESS')
    } catch (err) {
      console.error(err)
      setStatus('UNAUTHORIZED')
    }
  }

  const logout = () => {
    setStatus('PENDING')
    localStorage.removeItem('accessToken')
  }

  return (
    <AuthContext.Provider value={{ status, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const { status } = useContext(AuthContext)
  const isUserAuthenticated = status === 'SUCCESS'
  return {
    isUserAuthenticated
  }
}

export { AuthContext };
