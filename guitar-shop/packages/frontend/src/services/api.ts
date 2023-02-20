import axios, { AxiosInstance } from 'axios'
import { BACKEND_URL, REQUEST_TIMEOUT } from '../constants';
import { getToken } from './token';


export const createApi = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use((config) => {
    const token = getToken();

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  });

  return api;
};
