import type {
  AuthSession,
  AuthUser,
  LoginPayload,
} from "@/auth/types/auth.types";
import { http } from "@/services/api/core/client";

type UserRole = "broker" | "agent" | "buyer" | "seller";

type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  profile_picture: string | null;
  date_of_birth: string | null;
  role: UserRole;
  is_verified: boolean;
  verified_at: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

type LoginResponseData = {
  access_token: string;
  refresh_token?: string;
  expires_at?: string;
  user: User;
};

type LoginResponse = {
  status: number;
  message: string;
  data: LoginResponseData;
};

const mapSession = (response: LoginResponseData): AuthSession => ({
  accessToken: response.access_token,
  refreshToken: response.refresh_token,
  expiresAt: response.expires_at,
  user: {
    id: response.user.id,
    firstName: response.user.firstName,
    lastName: response.user.lastName,
    email: response.user.email,
    role: response.user.role as AuthSession["user"]["role"],
  },
});

export const authEndpoint = {
  async login(payload: LoginPayload) {
    const response = await http.post<LoginResponse, LoginPayload>(
      "/auth/login",
      payload,
    );
    console.log("response", response);
    return mapSession(response.data);
  },
  async me() {
    return http.get<AuthUser>("/auth/me");
  },
  async refresh(refreshToken: string) {
    const response = await http.post<LoginResponse, { refreshToken: string }>(
      "/auth/refresh",
      {
        refreshToken,
      },
    );
    return mapSession(response.data);
  },
};
