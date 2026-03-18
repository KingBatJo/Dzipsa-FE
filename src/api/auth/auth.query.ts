import { getMe } from '@/api/auth/auth.api';
import { queryKeys } from '@/lib/queryKeys';
import { useQuery } from '@tanstack/react-query';

export const useMeQuery = () => {
  return useQuery({
    queryKey: queryKeys.auth.me,
    queryFn: getMe,
  });
};
