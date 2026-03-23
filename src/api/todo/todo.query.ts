import type {
  MyTodosCursorParams,
  TodoInstanceId,
} from '@/api/todo/todo.types';
import {
  getMyMissedTodos,
  getMyTodayTodos,
  getMyTodosAll,
  getMyUpcomingTodos,
  getTodoDetail,
} from '@/api/todo/todo.api';

import { queryKeys } from '@/lib/queryKeys';
import { useQuery } from '@tanstack/react-query';

const TODO_QUERY_STALE_TIME = 1000 * 60 * 3;

// 나의 할 일 통합 조회 (첫 진입용)
export const useMyTodosAllQuery = (params?: MyTodosCursorParams) => {
  return useQuery({
    queryKey: queryKeys.todo.myAll(params),
    queryFn: () => getMyTodosAll(params),
    staleTime: TODO_QUERY_STALE_TIME,
  });
};

export const useMyTodayTodosQuery = () =>
  useQuery({
    queryKey: queryKeys.todo.today(),
    queryFn: () => getMyTodayTodos(),
    staleTime: TODO_QUERY_STALE_TIME,
  });

export const useMyMissedTodosQuery = () =>
  useQuery({
    queryKey: queryKeys.todo.missed(),
    queryFn: () => getMyMissedTodos(),
    staleTime: TODO_QUERY_STALE_TIME,
  });

export const useMyUpcomingTodosQuery = () =>
  useQuery({
    queryKey: queryKeys.todo.upcoming(),
    queryFn: () => getMyUpcomingTodos(),
    staleTime: TODO_QUERY_STALE_TIME,
  });

// 할 일 상세 조회
export const useTodoDetailQuery = (instanceId: TodoInstanceId) => {
  return useQuery({
    queryKey: queryKeys.todo.detail(instanceId),
    queryFn: () => getTodoDetail(instanceId),
    enabled: instanceId != null,
    staleTime: TODO_QUERY_STALE_TIME,
  });
};
