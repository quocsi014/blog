import Axios, { InternalAxiosRequestConfig } from 'axios';
import { store } from '@/redux/store';
import {jwtDecode} from 'jwt-decode'
import { refreshToken as refreshTokenFn } from '@/features/auth/apis/refresh';
import Cookies from 'js-cookie';
import { setAccessToken } from '@/redux/slices/user-slice';
function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  if (config.headers) {
    config.headers.Accept = 'application/json';
  }

  config.withCredentials = true;
  return config;
}

export const axiosInstance = Axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const getBearerAuthConfig = (token: string | null) => {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  return config;
};

axiosInstance.interceptors.request.use(authRequestInterceptor);
axiosInstance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error.response.data);
  },
);
export const axiosInstanceJwt = Axios.create({
  ...axiosInstance.defaults,
});

axiosInstanceJwt.interceptors.request.use(async (config: InternalAxiosRequestConfig)=>{
  const now = new Date()
  let accessToken = store.getState().user.access_token
  const decodedToken = jwtDecode(accessToken || "")
  if (!(decodedToken && decodedToken.exp && decodedToken.exp > now.getTime())){
    const refreshToken = Cookies.get('refresh_token')
    const data = await refreshTokenFn(refreshToken || '')
    accessToken = data.access_token
    store.dispatch(setAccessToken(data.access_token))
    Cookies.set('refresh_token', data.refresh_token, {expires: 30})
  }
  config.headers.Authorization = `Bearer ${accessToken}`
  return config
})
