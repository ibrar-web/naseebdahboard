import type { AxiosRequestConfig } from 'axios';

export interface ApiListParams {
  page?: number;
  limit?: number;
  search?: string;
}

export type HttpRequestConfig = AxiosRequestConfig;
