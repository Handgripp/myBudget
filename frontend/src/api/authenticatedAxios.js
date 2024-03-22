import axios from 'axios';
import { bearerToken } from '../utils/auth';

const instance = axios.create({
  timeout: 3000,
});

instance.interceptors.request.use(
  (config) => {
    const token = bearerToken();
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (err) => Promise.reject(err),
);

export default instance;