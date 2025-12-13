// src/contexts/AuthContext.tsx
import { createContext, useContext, useEffect, useState } from "react";
import { setAccessToken } from "../services/api";
import * as AuthService from "../services/auth.service";
import {
  deleteRefreshToken,
  getRefreshToken,
  saveRefreshToken,
} from "../storage/token.storage";

type AuthContextType = {
  user: AuthService.User | null;
  accessToken: string | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  signup: (username: string, password: string) => Promise<void>;
  signout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthService.User | null>(null);
  const [accessToken, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const bootstrap = async () => {
      try {
        const refreshToken = await getRefreshToken();
        if (refreshToken) {
          const res = await AuthService.refreshToken(refreshToken);
          setUser(res.user ?? null);
          setToken(res.accessToken);
          setAccessToken(res.accessToken);
          await saveRefreshToken(res.refreshToken);
        }
      } catch {
        await deleteRefreshToken();
      } finally {
        setLoading(false);
      }
    };

    bootstrap();
  }, []);

  const login = async (username: string, password: string) => {
    const res = await AuthService.login(username, password);
    setUser(res.user);
    setToken(res.accessToken);
    setAccessToken(res.accessToken);
    await saveRefreshToken(res.refreshToken);
  };

  const signup = async (username: string, password: string) => {
    const res = await AuthService.signup(username, password);
    setUser(res.user);
    setToken(res.accessToken);
    setAccessToken(res.accessToken);
    await saveRefreshToken(res.refreshToken);
  };

  const signout = async () => {
    const refreshToken = await getRefreshToken();
    if (refreshToken) {
      await AuthService.signout(refreshToken);
    }
    setUser(null);
    setToken(null);
    setAccessToken(null);
    await deleteRefreshToken();
  };

  return (
    <AuthContext.Provider
      value={{ user, accessToken, loading, login, signup, signout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
