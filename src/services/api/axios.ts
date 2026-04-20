import axios from 'axios';
import { env } from '@/config/env';
import { authStorage } from '@/auth/services/authStorage.service';

export const api = axios.create({
  baseURL: env.apiBaseUrl,
  timeout: 20000,
});

api.interceptors.request.use((config) => {
  const session = authStorage.get();

  if (session?.accessToken) {
    config.headers.Authorization = `Bearer ${session.accessToken}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      authStorage.clear();
    }

    return Promise.reject(error);
  },
);
