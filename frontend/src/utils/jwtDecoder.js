import { jwtDecode } from 'jwt-decode';

export const decodeToken = (token) => {
  try {
    return jwtDecode(token);
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

export const getUsernameFromToken = (token) => {
  const decodedToken = decodeToken(token);
  return decodedToken ? decodedToken.username : null;
};