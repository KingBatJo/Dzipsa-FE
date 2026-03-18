import { agreeToTerms, getMe, logout, updateMe } from '@/api/auth/auth.api';
import { useMutation, useQuery } from '@tanstack/react-query';

import type { MeResponse } from '@/api/auth/auth.types';
import type { UpdateMeRequest } from '@/api/auth/auth.types';
import { queryClient } from '@/lib/queryClient';
import { queryKeys } from '@/lib/queryKeys';

type UseMeQueryParams = {
  enabled?: boolean;
};

// Queries
// 내 정보 조회
export const useMeQuery = ({ enabled = true }: UseMeQueryParams = {}) => {
  return useQuery({
    queryKey: queryKeys.auth.me,
    queryFn: getMe,
    enabled,
    staleTime: 1000 * 60 * 5,
  });
};

// Mutations
// 약관 동의
export const useAgreeToTermsMutation = () => {
  return useMutation({
    mutationFn: agreeToTerms,
    onSuccess: () => {
      queryClient.setQueryData(
        queryKeys.auth.me,
        (prev: MeResponse | undefined) =>
          prev ? { ...prev, termsAgreed: true } : prev
      );
    },
  });
};

// 내 정보 수정
export const useUpdateMeMutation = () => {
  return useMutation({
    mutationFn: (payload: UpdateMeRequest) => updateMe(payload),
    onSuccess: (updatedMe) => {
      queryClient.setQueryData(queryKeys.auth.me, updatedMe);
    },
  });
};

// 로그아웃
export const useLogoutMutation = () => {
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: queryKeys.auth.me });
    },
  });
};
