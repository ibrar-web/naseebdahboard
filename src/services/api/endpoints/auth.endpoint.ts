import type { AuthSession, AuthUser, LoginPayload } from "@/auth/types/auth.types";
import { http } from "@/services/api/core/client";

type UserRole = "broker" | "agent" | "buyer" | "seller";

type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  profile_picture?: string | null;
  date_of_birth?: string | null;
  role: UserRole;
  is_verified?: boolean;
  verified_at?: string | null;
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
};

type AuthPayload = {
  access_token: string;
  refresh_token?: string;
  expires_at?: string;
  user: User;
};

type LoginResponse = AuthPayload & {
  message?: string;
};

type MeResponse = {
  message?: string;
  user: User;
};

type WrappedResponse<T> = {
  data: T;
};

const unwrap = <T>(response: T | WrappedResponse<T>): T => {
  if (response && typeof response === "object" && "data" in response) {
    return (response as WrappedResponse<T>).data;
  }

  return response as T;
};

const mapUser = (user: User): AuthUser => ({
  id: user.id,
  firstName: user.firstName,
  lastName: user.lastName,
  email: user.email,
  role: user.role as AuthUser["role"],
});

const mapSession = (response: AuthPayload): AuthSession => ({
  accessToken: response.access_token,
  refreshToken: response.refresh_token,
  expiresAt: response.expires_at,
  user: mapUser(response.user),
});

export const authEndpoint = {
  async login(payload: LoginPayload) {
    const response = await http.post<LoginResponse | WrappedResponse<AuthPayload>, LoginPayload>("/auth/login", payload);
    return mapSession(unwrap<AuthPayload>(response));
  },
  async me() {
    const response = await http.get<MeResponse | WrappedResponse<User>>("/auth/me");
    const payload = unwrap<User | MeResponse>(response);
    return mapUser("user" in payload ? payload.user : payload);
  },
  async refresh(refreshToken: string) {
    const response = await http.post<LoginResponse | WrappedResponse<AuthPayload>, { refreshToken: string }>(
      "/auth/refresh",
      { refreshToken },
    );
    return mapSession(unwrap<AuthPayload>(response));
  },
};
