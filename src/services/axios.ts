import axios, { Axios, AxiosError } from 'axios';
import { checkLogin, getAuthInfo, refreshToken } from './auth';

const api = axios.create({
  baseURL: 'https://api.spotify.com/',
  timeout: 10000,
});

api.interceptors.request.use(config => {
  if (checkLogin()) {
    config.headers.Authorization = `Bearer ${getAuthInfo()?.access_token}`;
  }
  return config;
});

api.interceptors.response.use(response => {
  return response;
}, (error: AxiosError) => {
  if (error.response?.status === 401) {
    const authInfo = getAuthInfo();
    if (authInfo && authInfo.refresh_token) {
        refreshToken(authInfo.refresh_token);
    }
  }
  return Promise.reject(error);
})

export default api;

export const authApi = axios.create({
  baseURL: 'https://accounts.spotify.com/',
  timeout: 10000,
});

  