import type { AxiosInstance } from 'axios';
import type { HttpRequestConfig } from '@/services/api/core/http.types';

export const createHttpMethods = (client: AxiosInstance) => ({
  get: async <TResponse>(url: string, config?: HttpRequestConfig) => {
    const { data } = await client.get<TResponse>(url, config);
    return data;
  },
  post: async <TResponse, TPayload = unknown>(url: string, payload?: TPayload, config?: HttpRequestConfig) => {
    const { data } = await client.post<TResponse>(url, payload, config);
    return data;
  },
  put: async <TResponse, TPayload = unknown>(url: string, payload?: TPayload, config?: HttpRequestConfig) => {
    const { data } = await client.put<TResponse>(url, payload, config);
    return data;
  },
  patch: async <TResponse, TPayload = unknown>(url: string, payload?: TPayload, config?: HttpRequestConfig) => {
    const { data } = await client.patch<TResponse>(url, payload, config);
    return data;
  },
  delete: async <TResponse>(url: string, config?: HttpRequestConfig) => {
    const { data } = await client.delete<TResponse>(url, config);
    return data;
  },
});
