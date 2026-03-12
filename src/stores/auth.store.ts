import type { MeResponse } from '@/api/auth/auth.types';
import { create } from 'zustand';

type AuthState = {
  accessToken: string | null;
  user: MeResponse | null;

  setAccessToken: (token: string | null) => void;
  setUser: (user: MeResponse | null) => void;
  clearAuth: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  user: null,

  setAccessToken: (token) =>
    set({
      accessToken: token,
    }),

  setUser: (user) =>
    set({
      user,
    }),

  clearAuth: () =>
    set({
      accessToken: null,
      user: null,
    }),
}));
