import axios, { AxiosError, AxiosHeaders, InternalAxiosRequestConfig } from "axios";
import { router } from "expo-router";
import { deleteRefreshToken, getRefreshToken, saveRefreshToken } from "../storage/token.storage";

let accessToken: string | null = null;

export function setAccessToken(token: string | null) {
  accessToken = token;
}

export interface AuthRequestConfig extends InternalAxiosRequestConfig {
  authRequired?: boolean;
  _retry?: boolean;
}

export const api = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// REQUEST INTERCEPTOR
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const cfg = config as AuthRequestConfig;

  if (cfg.authRequired && accessToken) {
    // Create a proper AxiosHeaders instance
    const headers = new AxiosHeaders(cfg.headers);
    headers.set("Authorization", `Bearer ${accessToken}`);
    cfg.headers = headers;
  }

  return cfg;
});

// RESPONSE INTERCEPTOR
api.interceptors.response.use(
  (res) => res,
  async (error: AxiosError & { config?: AuthRequestConfig }) => {
    const original = error.config as AuthRequestConfig;

    if (error.response?.status === 401 && original && !original._retry) {
      original._retry = true;

      try {
        const refreshToken = await getRefreshToken();
        if (!refreshToken) throw new Error("No refresh token");

        const res = await axios.post("http://localhost:3000/api/auth/refresh", { refreshToken });
        accessToken = res.data.accessToken;
        await saveRefreshToken(res.data.refreshToken);

        // Convert original.headers to object and set Authorization
        original.headers = new AxiosHeaders(original.headers);
        original.headers.set("Authorization", `Bearer ${accessToken}`);

        return api(original);
      } catch {
        await deleteRefreshToken();
        router.replace("/");
      }
    }

    return Promise.reject(error);
  }
);
