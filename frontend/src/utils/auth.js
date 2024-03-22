import { jwtDecode } from 'jwt-decode';

export const getToken = () => localStorage.getItem('accessToken' || null);

export const isTokenValid = (token) => {
  const { exp } = jwtDecode(token);
  return Date.now() <= exp * 1000;
};

export const isAuthenticated = () => {
  const token = getToken();
  return token ? Boolean(token) && isTokenValid(token) : false;
};

export const bearerToken = () => `Bearer ${getToken()}`;