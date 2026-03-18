import { getMe } from '@/api/auth/auth.api';
import { queryKeys } from '@/lib/queryKeys';
import { useQuery } from '@tanstack/react-query';

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
