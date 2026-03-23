import type {
  GetMyTodayTodosParams,
  MyTodosCursorParams,
  TodoPageParams,
} from '@/api/todo/todo.types';
import type { GetRulesParams, RuleId } from '@/api/rule/rule.types';

import { DEFAULT_RULE_LIST_SIZE } from '@/constants/rule';
import { DEFAULT_TODO_PAGE_SIZE } from '@/constants/todos';

// 동일한 요청이 같은 queryKey를 쓰도록 size 기본값을 포함해 params를 정규화
const normalizeRuleListParams = (params?: GetRulesParams) => {
  return {
    cursor: params?.cursor,
    size: params?.size ?? DEFAULT_RULE_LIST_SIZE,
  };
};

const normalizeTodoPageParams = (params?: TodoPageParams) => ({
  cursor: params?.cursor ?? null,
  size: params?.size ?? DEFAULT_TODO_PAGE_SIZE,
});

const normalizeMyTodosCursorParams = (params?: MyTodosCursorParams) => ({
  missedCursor: params?.missedCursor ?? null,
  todayCursor: params?.todayCursor ?? null,
  upcomingCursor: params?.upcomingCursor ?? null,
});

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
    my: ['todo', 'my'] as const,
    myAll: (params?: MyTodosCursorParams) =>
      [
        ...queryKeys.todo.my,
        'all',
        normalizeMyTodosCursorParams(params),
      ] as const,

    today: (params?: GetMyTodayTodosParams) =>
      [...queryKeys.todo.my, 'today', normalizeTodoPageParams(params)] as const,

    missed: (params?: TodoPageParams) =>
      [
        ...queryKeys.todo.my,
        'missed',
        normalizeTodoPageParams(params),
      ] as const,

    upcoming: (params?: TodoPageParams) =>
      [
        ...queryKeys.todo.my,
        'upcoming',
        normalizeTodoPageParams(params),
      ] as const,
  },
};
