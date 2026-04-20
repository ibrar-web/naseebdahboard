import type { LoginPayload } from '@/auth/types/auth.types';
import { apiRegistry } from '@/services/api';

export const authApi = {
  login(payload: LoginPayload) {
    return apiRegistry.auth.login(payload);
  },
  me() {
    return apiRegistry.auth.me();
  },
  refresh(refreshToken: string) {
    return apiRegistry.auth.refresh(refreshToken);
  },
};
