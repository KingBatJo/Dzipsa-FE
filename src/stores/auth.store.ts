import { create } from 'zustand';

type AuthState = {
  accessToken: string | null;
  isAuthChecked: boolean; // 인증 확인 여부

  setAccessToken: (token: string | null) => void;
  setAuthChecked: (checked: boolean) => void;
  clearAuth: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  isAuthChecked: false,

  setAccessToken: (token) =>
    set({
      accessToken: token,
    }),

  setAuthChecked: (checked) =>
    set({
      isAuthChecked: checked,
    }),

  clearAuth: () =>
    set({
      accessToken: null,
      isAuthChecked: true,
    }),
}));
