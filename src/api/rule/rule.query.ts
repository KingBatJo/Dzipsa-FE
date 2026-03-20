import type { GetRulesParams, RuleId } from '@/api/rule/rule.types';
import { createRule, getRuleDetail, getRules } from '@/api/rule/rule.api';
import { useMutation, useQuery } from '@tanstack/react-query';

import { queryClient } from '@/lib/queryClient';
import { queryKeys } from '@/lib/queryKeys';

// Queries
// 규칙 목록 조회
export const useRulesQuery = (params?: GetRulesParams) => {
  return useQuery({
    queryKey: queryKeys.rule.list(params),
    queryFn: () => getRules(params),
    staleTime: 1000 * 60 * 3,
  });
};

// 규칙 상세 조회
export const useRuleDetailQuery = (ruleId: RuleId) => {
  return useQuery({
    queryKey: queryKeys.rule.detail(ruleId),
    queryFn: () => getRuleDetail(ruleId),
    staleTime: 1000 * 60 * 3,
  });
};

// Mutations
// 규칙 등록
export const useCreateRuleMutation = () => {
  return useMutation({
    mutationFn: createRule,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.rule.all });
    },
  });
};
