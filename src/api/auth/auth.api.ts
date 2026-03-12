import type { MeResponse } from '@/api/auth/auth.types';
import { apiClient } from '@/api/client';

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
