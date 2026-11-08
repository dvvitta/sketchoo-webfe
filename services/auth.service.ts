import { apiFetch } from "@/lib/api";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  user: {
    id: string;
    name: string | null;
    email: string | null;
    role: string;
    created_at: string;
  };
}

export const authService = {
  login: (payload: LoginPayload) => {
    return apiFetch<LoginResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },
};
