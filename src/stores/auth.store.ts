import type { MeResponse } from '@/api/auth/auth.types';
import { create } from 'zustand';

type AuthState = {
  accessToken: string | null;
  user: MeResponse | null;
  isAuthChecked: boolean; // 인증 확인 여부

  setAccessToken: (token: string | null) => void;
  setUser: (user: MeResponse | null) => void;
  updateUser: (payload: Partial<MeResponse>) => void;
  setAuthChecked: (checked: boolean) => void;
  clearAuth: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  user: null,
  isAuthChecked: false,

  setAccessToken: (token) =>
    set({
      accessToken: token,
    }),

  setUser: (user) =>
    set({
      user,
    }),

  updateUser: (payload) =>
    set((state) => ({
      user: state.user ? { ...state.user, ...payload } : state.user,
    })),

  setAuthChecked: (checked) =>
    set({
      isAuthChecked: checked,
    }),

  clearAuth: () =>
    set({
      accessToken: null,
      user: null,
      isAuthChecked: true,
    }),
}));
