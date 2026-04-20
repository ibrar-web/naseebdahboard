import type { AuthSession, AuthUser, LoginPayload } from '@/auth/types/auth.types';
import { http } from '@/services/api/core/client';

type LoginResponse = {
  access_token: string;
  refresh_token?: string;
  expires_at?: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: 'broker' | 'agent' | 'buyer' | 'seller';
  };
};

const mapSession = (response: LoginResponse): AuthSession => ({
  accessToken: response.access_token,
  refreshToken: response.refresh_token,
  expiresAt: response.expires_at,
  user: {
    id: response.user.id,
    firstName: response.user.firstName,
    lastName: response.user.lastName,
    email: response.user.email,
    role: response.user.role as AuthSession['user']['role'],
  },
});

export const authModule = {
  async login(payload: LoginPayload) {
    const response = await http.post<LoginResponse, LoginPayload>('/auth/login', payload);
    return mapSession(response);
  },
  async me() {
    return http.get<AuthUser>('/auth/me');
  },
  async refresh(refreshToken: string) {
    const response = await http.post<LoginResponse, { refreshToken: string }>('/auth/refresh', {
      refreshToken,
    });
    return mapSession(response);
  },
};
