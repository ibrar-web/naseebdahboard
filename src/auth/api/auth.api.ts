import { api } from '@/services/api/axios';
import type { AuthSession, LoginPayload } from '@/auth/types/auth.types';

type LoginResponse = {
  access_token: string;
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
  user: {
    id: response.user.id,
    firstName: response.user.firstName,
    lastName: response.user.lastName,
    email: response.user.email,
    role: response.user.role as AuthSession['user']['role'],
  },
});

export const authApi = {
  async login(payload: LoginPayload) {
    const { data } = await api.post<LoginResponse>('/auth/login', payload);
    return mapSession(data);
  },
  async me() {
    const { data } = await api.get<LoginResponse['user']>('/auth/me');
    return data;
  },
};
