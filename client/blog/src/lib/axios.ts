import Axios, { InternalAxiosRequestConfig } from "axios";

function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  if (config.headers) {
    config.headers.Accept = 'application/json';
  }

  config.withCredentials = true;
  return config;
}

export const axiosInstance = Axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

export const getBearerAuthConfig = (token: string | null)=>{
  const config = { headers: { Authorization: `Bearer ${token}` } };
  return config
}

axiosInstance.interceptors.request.use(authRequestInterceptor);
axiosInstance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error.response.data);
  },
);
