import axios from 'axios'

export const authApi = {
  login(data) {
    return axios.post('http://localhost:3010/auth/login', data);
  }
}