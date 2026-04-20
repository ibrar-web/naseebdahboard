import type { AdminRole } from '@/utils/permissions/roles';

export interface AuthUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: AdminRole;
}

export interface AuthSession {
  accessToken: string;
  user: AuthUser;
}

export interface LoginPayload {
  email: string;
  password: string;
}
