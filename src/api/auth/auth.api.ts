import { apiClient } from '@/api/client';

// 로그아웃
export const logout = async () => {
  await apiClient.post('/api/auth/logout');
};

// 회원탈퇴
export const deleteMe = async () => {
  await apiClient.delete('/api/users/me');
};
