import type { GetRulesParams, RuleId } from '@/api/rule/rule.types';

import { DEFAULT_RULE_LIST_SIZE } from '@/constants/rule';
import type { MyTodosCursorParams } from '@/api/todo/todo.types';

// 동일한 요청이 같은 queryKey를 쓰도록 size 기본값을 포함해 params를 정규화
const normalizeRuleListParams = (params?: GetRulesParams) => {
  return {
    cursor: params?.cursor,
    size: params?.size ?? DEFAULT_RULE_LIST_SIZE,
  };
};

// 동일한 요청이 같은 queryKey를 쓰도록 cursor 파라미터를 정규화
const normalizeMyTodosCursorParams = (params?: MyTodosCursorParams) => {
  return {
    missedCursor: params?.missedCursor ?? null,
    todayCursor: params?.todayCursor ?? null,
    upcomingCursor: params?.upcomingCursor ?? null,
  };
};

export const queryKeys = {
  auth: {
    me: ['auth', 'me'] as const,
  },
  room: {
    myRoom: ['room', 'myRoom'] as const,
    invitationCode: ['room', 'invitationCode'] as const,
  },
  rule: {
    all: ['rule'] as const,
    list: (params?: GetRulesParams) =>
      [...queryKeys.rule.all, 'list', normalizeRuleListParams(params)] as const,
    detail: (ruleId: RuleId) =>
      [...queryKeys.rule.all, 'detail', ruleId] as const,
    recentWarnings: () => [...queryKeys.rule.all, 'recentWarnings'] as const,
  },
  todo: {
    all: ['todo'] as const,
    my: {
      all: (params?: MyTodosCursorParams) =>
        [
          ...queryKeys.todo.all,
          'my',
          'all',
          normalizeMyTodosCursorParams(params),
        ] as const,
    },
  },
};
