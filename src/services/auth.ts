import queryString from 'query-string';
import { authApi } from './axios';

const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_CLIENT_SECRET;
const REDIRECT_URI = 'http://localhost:5173/callback';
const BASIC_TOKEN = btoa((CLIENT_ID + ':' + CLIENT_SECRET).toString());

const enum AUTH_ENDPOINT {
    TOKEN = 'api/token'
}

export type AuthInfo = {
    access_token: string
    token_type: string
    scope: string
    expires_in: number
    refresh_token: string
}

const generateRandomString = (length: number) => {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};
  
  
export const logout = () => {
    clearCookies();
    cachedAuthInfo = null;
}

export const login = () => {
    let state = generateRandomString(16);
    let scope = 'user-read-private user-read-email';
    window.location.replace('https://accounts.spotify.com/authorize?' +
    queryString.stringify({
      response_type: 'code',
      client_id: CLIENT_ID,
      scope: scope,
      redirect_uri: REDIRECT_URI,
      state: state
    }));
}

export const getToken = async (code: string): Promise<AuthInfo | null> => {
    let res = await authApi.post(AUTH_ENDPOINT.TOKEN, queryString.stringify({
        code: code,
        redirect_uri: REDIRECT_URI,
        grant_type: 'authorization_code'
    }), {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',     
            'Authorization': `Basic ${BASIC_TOKEN}`
        }
    });

    if (res.status === 200) {
        return res.data as AuthInfo;
    }
    return null;
}

export const refreshToken = async (refreshToken: string): Promise<AuthInfo | null> => {
    let res = await authApi.post(AUTH_ENDPOINT.TOKEN, queryString.stringify({
        refresh_token: refreshToken,
        grant_type: 'refresh_token'
    }), {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',     
            'Authorization': `Basic ${BASIC_TOKEN}`
        }
    });

    if (res.status === 200) {
        return res.data as AuthInfo;
    }
    return null;
}


let cachedAuthInfo: AuthInfo | null = null;

const getAuthInfoFromCookie = (): AuthInfo | null => {
    if (document.cookie.length !== 0)
        return JSON.parse(document.cookie.substring(0, document.cookie.length - 1)) as AuthInfo;
    return null;
}

const clearCookies = () => {
    document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
}

export const saveAuthInfo = (authInfo: AuthInfo) => {
    clearCookies();
    document.cookie = JSON.stringify(authInfo);
    cachedAuthInfo = authInfo;
}

export const getAuthInfo = (): AuthInfo | null => {
    if (!checkLogin) return null;
    if (cachedAuthInfo) return cachedAuthInfo;
    const authInfo = getAuthInfoFromCookie();
    cachedAuthInfo = authInfo;
    return authInfo;
}


export const checkLogin = (): boolean => {
    return document.cookie.length !== 0;
}