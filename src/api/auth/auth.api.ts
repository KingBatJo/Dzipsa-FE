import { BASE_URL, apiClient } from '@/api/client';
import type { MeResponse, RefreshResponse } from '@/api/auth/auth.types';

import axios from 'axios';

// AccessToken 유효성 검증
export const checkAuth = async () => {
  await apiClient.get('/api/auth/check');
};

// accessToken 재발급
export const refresh = async () => {
  const { data } = await axios.post<RefreshResponse>(
    '/api/auth/refresh',
    null,
    {
      baseURL: BASE_URL,
      withCredentials: true,
    }
  );

  return data;
};

// 로그아웃
export const logout = async () => {
  await apiClient.post('/api/auth/logout');
};

// 회원탈퇴
export const deleteMe = async () => {
  await apiClient.delete('/api/users/me');
};

// 내 정보 조회
export const getMe = async () => {
  const { data } = await apiClient.get<MeResponse>('/api/auth/me');
  return data;
};
