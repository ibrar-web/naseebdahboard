import axios from 'axios';
import type { AuthSession } from '@/auth/types/auth.types';
import { authStorage } from '@/auth/services/authStorage.service';
import { env } from '@/config/env';
import { createHttpMethods } from '@/services/api/core/http';

export const apiClient = axios.create({
  baseURL: env.apiBaseUrl,
  timeout: env.apiTimeoutMs,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

let refreshPromise: Promise<AuthSession | null> | null = null;
let unauthorizedHandler: (() => void) | null = null;
let refreshSessionHandler: ((refreshToken: string) => Promise<AuthSession>) | null = null;

export const registerUnauthorizedHandler = (handler: (() => void) | null) => {
  unauthorizedHandler = handler;
};

export const registerRefreshSessionHandler = (
  handler: ((refreshToken: string) => Promise<AuthSession>) | null,
) => {
  refreshSessionHandler = handler;
};

apiClient.interceptors.request.use((config) => {
  const session = authStorage.get();

  if (session?.accessToken) {
    config.headers.Authorization = `Bearer ${session.accessToken}`;
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config as typeof error.config & { _retry?: boolean };

    if (error.response?.status === 401 && !originalRequest?._retry) {
      const session = authStorage.get();

      if (session?.refreshToken && refreshSessionHandler) {
        originalRequest._retry = true;
        refreshPromise ??= refreshSessionHandler(session.refreshToken).catch(() => null);

        const refreshedSession = await refreshPromise.finally(() => {
          refreshPromise = null;
        });

        if (refreshedSession?.accessToken) {
          originalRequest.headers = {
            ...originalRequest.headers,
            Authorization: `Bearer ${refreshedSession.accessToken}`,
          };
          return apiClient(originalRequest);
        }
      }

      authStorage.clear();
      unauthorizedHandler?.();
    }

    return Promise.reject(error);
  },
);

export const http = createHttpMethods(apiClient);
