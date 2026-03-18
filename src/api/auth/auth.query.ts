import type { MeResponse } from '@/api/auth/auth.types';
import { agreeToTerms, getMe, logout, updateMe } from '@/api/auth/auth.api';
import type { UpdateMeRequest } from '@/api/auth/auth.types';
import { useMutation, useQuery } from '@tanstack/react-query';

import { queryClient } from '@/lib/queryClient';
import { queryKeys } from '@/lib/queryKeys';

type UseMeQueryParams = {
  enabled?: boolean;
};

export const useMeQuery = ({ enabled = true }: UseMeQueryParams = {}) => {
  return useQuery({
    queryKey: queryKeys.auth.me,
    queryFn: getMe,
    enabled,
  });
};

export const useLogoutMutation = () => {
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: queryKeys.auth.me });
    },
  });
};

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

export const useUpdateMeMutation = () => {
  return useMutation({
    mutationFn: (payload: UpdateMeRequest) => updateMe(payload),
    onSuccess: (updatedMe) => {
      queryClient.setQueryData(queryKeys.auth.me, updatedMe);
    },
  });
};
