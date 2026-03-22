import type { RuleDetailResponse, RuleId } from '@/api/rule/rule.types';
import {
  createRule,
  createRuleWarning,
  deleteRule,
  getRecentWarnings,
  getRuleDetail,
  getRules,
  updateRule,
} from '@/api/rule/rule.api';
import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';

import { DEFAULT_RULE_LIST_SIZE } from '@/constants/rule';
import { queryClient } from '@/lib/queryClient';
import { queryKeys } from '@/lib/queryKeys';

// Queries
// 규칙 목록 무한스크롤 조회
export const useInfiniteRulesQuery = (size = DEFAULT_RULE_LIST_SIZE) => {
  return useInfiniteQuery({
    queryKey: [...queryKeys.rule.all, 'list', 'infinite', size] as const,
    queryFn: ({ pageParam }) =>
      getRules({ cursor: pageParam as number | undefined, size }),
    initialPageParam: undefined as number | undefined,
    getNextPageParam: (lastPage) => {
      if (lastPage.length < size) return undefined;
      return lastPage[lastPage.length - 1]?.id;
    },
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

// 최근 알리기(경고) 목록 조회
export const useRecentRuleWarningsQuery = () => {
  return useQuery({
    queryKey: queryKeys.rule.recentWarnings(),
    queryFn: getRecentWarnings,
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

// 규칙 수정
export const useUpdateRuleMutation = () => {
  return useMutation({
    mutationFn: updateRule,
    onSuccess: (updatedRule, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.rule.all });
      queryClient.setQueryData(
        queryKeys.rule.detail(variables.ruleId),
        updatedRule
      );
    },
  });
};

// 규칙 삭제
export const useDeleteRuleMutation = () => {
  return useMutation({
    mutationFn: deleteRule,
    onSuccess: (_, ruleId) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.rule.all });
      queryClient.removeQueries({ queryKey: queryKeys.rule.detail(ruleId) });
    },
  });
};

// 집사에게 알리기(경고) 등록
export const useCreateRuleWarningMutation = () => {
  return useMutation({
    mutationFn: createRuleWarning,
    onSuccess: (_, ruleId) => {
      queryClient.setQueryData(
        queryKeys.rule.detail(ruleId),
        (prev: RuleDetailResponse | undefined) =>
          prev ? { ...prev, warningDisabled: true } : prev
      );

      queryClient.invalidateQueries({ queryKey: queryKeys.rule.all });
      queryClient.invalidateQueries({
        queryKey: queryKeys.rule.recentWarnings(),
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.rule.detail(ruleId),
      });
    },
  });
};
