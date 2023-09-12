import axios, { Axios, AxiosError } from 'axios';
import { checkLogin, getAuthInfo, refreshToken, saveAuthInfo } from './auth';

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
}, async (error: AxiosError) => {
  const prevRequest = error.config;

  if (error.response?.status === 401 && !prevRequest._retry) {
    const authInfo = getAuthInfo();
    if (authInfo && authInfo.refresh_token) {
      prevRequest._retry = true;
      refreshToken(authInfo.refresh_token).then((e) => {
        if (e) {
          saveAuthInfo(e);
          prevRequest.headers.Authorization =  `Bearer ${e?.access_token}`;
        }
      });
    }
    return api(prevRequest);
  }

  return Promise.reject(error);
})

export default api;

export const authApi = axios.create({
  baseURL: 'https://accounts.spotify.com/',
  timeout: 10000,
});

  