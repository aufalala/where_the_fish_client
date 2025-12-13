import { api } from "./api";

export type User = {
  id: string;
  username: string;
};

export type AuthResponse = {
  accessToken: string;
  refreshToken: string;
  user: User;
};

export async function login(username: string, password: string): Promise<AuthResponse> {
  const res = await api.post<AuthResponse>("/auth/signin", { username, password });
  return res.data;
}

export async function signup(username: string, password: string): Promise<AuthResponse> {
  const res = await api.post<AuthResponse>("/auth/signup", { username, password });
  return res.data;
}

export async function refreshToken(refreshToken: string): Promise<{ accessToken: string; refreshToken: string; user?: User }> {
  const res = await api.post("/auth/refresh", { refreshToken });
  return res.data;
}

export async function signout(refreshToken: string): Promise<void> {
  await api.post("/auth/signout", { refreshToken });
}
