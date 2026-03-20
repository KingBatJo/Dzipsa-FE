import type {
  GetRulesParams,
  RuleListItemResponse,
} from '@/api/rule/rule.types';

import { DEFAULT_RULE_LIST_SIZE } from '@/constants/rule';
import { apiClient } from '@/api/client';

// 규칙 목록 조회
export const getRules = async (
  params?: GetRulesParams
): Promise<RuleListItemResponse[]> => {
  const { data } = await apiClient.get<RuleListItemResponse[]>('/api/rules', {
    params: {
      ...params,
      size: params?.size ?? DEFAULT_RULE_LIST_SIZE,
    },
  });

  return data;
};
