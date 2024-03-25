import React, { createContext, useContext, useEffect, useState } from 'react';
import { authApi } from './api/auth';
import { isAuthenticated } from './utils/auth';
import { getUsernameFromToken } from './utils/jwtDecoder';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [status, setStatus] = useState('PENDING');
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const isUserAuthenticated = isAuthenticated();
    if (isUserAuthenticated) {
      setStatus('SUCCESS');
      const token = localStorage.getItem('accessToken');
      const decodedUsername = getUsernameFromToken(token);
      setUsername(decodedUsername);
    } else {
      setStatus('UNAUTHORIZED');
      setUsername(null);
    }
  }, []);

  const login = async (loginData) => {
    try {
      const { data } = await authApi.login(loginData);
      localStorage.setItem('accessToken', data.accessToken);
      setStatus('SUCCESS');
      const decodedUsername = getUsernameFromToken(data.accessToken);
      setUsername(decodedUsername);
    } catch (err) {
      console.error(err);
      setStatus('UNAUTHORIZED');
    }
  };

  const logout = () => {
    setStatus('PENDING');
    localStorage.removeItem('accessToken');
    setUsername(null);
  };

  return (
    <AuthContext.Provider value={{ status, login, logout, username }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const { status, username } = useContext(AuthContext);
  const isUserAuthenticated = status === 'SUCCESS';
  return {
    isUserAuthenticated,
    username,
  };
};

export { AuthContext };
