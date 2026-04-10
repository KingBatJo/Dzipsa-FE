import { BASE_URL, apiClient } from '@/api/client';
import type {
  MeResponse,
  RefreshResponse,
  UpdateMeRequest,
} from '@/api/auth/auth.types';

import axios from 'axios';

// AccessToken 유효성 검증
export const checkAuth = async (): Promise<void> => {
  await apiClient.get('/api/auth/check');
};

// accessToken 재발급
export const refresh = async (): Promise<RefreshResponse> => {
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

// 내 정보 조회
export const getMe = async (): Promise<MeResponse> => {
  const { data } = await apiClient.get<MeResponse>('/api/auth/me');
  return data;
};

// 로그아웃
export const logout = async (): Promise<void> => {
  await apiClient.post('/api/auth/logout');
};

// 회원탈퇴
export const deleteMe = async (): Promise<void> => {
  await apiClient.delete('/api/auth/withdraw');
};

// 내 정보 수정
export const updateMe = async (
  payload: UpdateMeRequest
): Promise<MeResponse> => {
  const { data } = await apiClient.patch<MeResponse>('/api/users/me', payload);
  return data;
};

// 이용약관 동의
export const agreeToTerms = async (): Promise<void> => {
  await apiClient.post('/api/users/me/terms-agreement');
};
