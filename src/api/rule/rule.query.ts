import type { GetRulesParams } from '@/api/rule/rule.types';
import { getRules } from '@/api/rule/rule.api';
import { queryKeys } from '@/lib/queryKeys';
import { useQuery } from '@tanstack/react-query';

// 규칙 목록 조회
export const useRulesQuery = (params?: GetRulesParams) => {
  return useQuery({
    queryKey: queryKeys.rule.list(params),
    queryFn: () => getRules(params),
    staleTime: 1000 * 60 * 3,
  });
};
