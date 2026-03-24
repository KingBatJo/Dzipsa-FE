import type {
  MyTodosCursorParams,
  TodoInstanceId,
} from '@/api/todo/todo.types';
import {
  completeTodo,
  createTodo,
  deleteRecurringTodo,
  deleteTodoImage,
  getCompletedTodos,
  getHouseAllTodos,
  getHouseDelayedTodos,
  getHouseMemberTodos,
  getHouseTodayTodos,
  getHouseTodoStats,
  getMyMissedTodos,
  getMyTodayTodos,
  getMyTodosAll,
  getMyUpcomingTodos,
  getTodoDetail,
  resetTodoStatus,
  updateTodo,
} from '@/api/todo/todo.api';
import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';

import { queryClient } from '@/lib/queryClient';
import { queryKeys } from '@/lib/queryKeys';

const TODO_QUERY_STALE_TIME = 1000 * 60 * 3;

// Queries
// 나의 할 일 통합 조회 (첫 진입용)
export const useMyTodosAllQuery = (params?: MyTodosCursorParams) => {
  return useQuery({
    queryKey: queryKeys.todo.myAll(params),
    queryFn: () => getMyTodosAll(params),
    staleTime: TODO_QUERY_STALE_TIME,
  });
};

// 놓친 할 일 페이징 조회
export const useInfiniteMyMissedTodosQuery = (enabled = true) =>
  useInfiniteQuery({
    queryKey: queryKeys.todo.missed(),
    queryFn: ({ pageParam }) => getMyMissedTodos({ cursor: pageParam }),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) =>
      lastPage.hasNext ? (lastPage.nextCursor ?? undefined) : undefined,
    staleTime: TODO_QUERY_STALE_TIME,
    enabled,
  });

// 오늘 할 일 페이징 조회
export const useInfiniteMyTodayTodosQuery = (enabled = true) =>
  useInfiniteQuery({
    queryKey: queryKeys.todo.today(),
    queryFn: ({ pageParam }) => getMyTodayTodos({ cursor: pageParam }),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) =>
      lastPage.hasNext ? (lastPage.nextCursor ?? undefined) : undefined,
    staleTime: TODO_QUERY_STALE_TIME,
    enabled,
  });

// 예정된 할 일 페이징 조회
export const useInfiniteMyUpcomingTodosQuery = (enabled = true) =>
  useInfiniteQuery({
    queryKey: queryKeys.todo.upcoming(),
    queryFn: ({ pageParam }) => getMyUpcomingTodos({ cursor: pageParam }),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) =>
      lastPage.hasNext ? (lastPage.nextCursor ?? undefined) : undefined,
    staleTime: TODO_QUERY_STALE_TIME,
    enabled,
  });

// 우리집 할 일 - 넛지 및 통계 조회
export const useHouseTodoStatsQuery = () =>
  useQuery({
    queryKey: queryKeys.todo.houseStats(),
    queryFn: getHouseTodoStats,
    staleTime: TODO_QUERY_STALE_TIME,
  });

// 우리집 할 일 - 오늘/지연/전체 조회
export const useInfiniteHouseTodayTodosQuery = (enabled = true) =>
  useInfiniteQuery({
    queryKey: queryKeys.todo.houseToday(),
    queryFn: ({ pageParam }) => getHouseTodayTodos({ cursor: pageParam }),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) =>
      lastPage.hasNext ? (lastPage.nextCursor ?? undefined) : undefined,
    staleTime: TODO_QUERY_STALE_TIME,
    enabled,
  });

export const useInfiniteHouseDelayedTodosQuery = (enabled = true) =>
  useInfiniteQuery({
    queryKey: queryKeys.todo.houseDelayed(),
    queryFn: ({ pageParam }) => getHouseDelayedTodos({ cursor: pageParam }),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) =>
      lastPage.hasNext ? (lastPage.nextCursor ?? undefined) : undefined,
    staleTime: TODO_QUERY_STALE_TIME,
    enabled,
  });

export const useInfiniteHouseAllTodosQuery = (enabled = true) =>
  useInfiniteQuery({
    queryKey: queryKeys.todo.houseAll(),
    queryFn: ({ pageParam }) => getHouseAllTodos({ cursor: pageParam }),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) =>
      lastPage.hasNext ? (lastPage.nextCursor ?? undefined) : undefined,
    staleTime: TODO_QUERY_STALE_TIME,
    enabled,
  });

// 우리집 할 일 - 구성원별 할 일 조회
export const useInfiniteHouseMemberTodosQuery = (
  memberId: number,
  enabled = true
) =>
  useInfiniteQuery({
    queryKey: queryKeys.todo.houseMember(memberId),
    queryFn: ({ pageParam }) =>
      getHouseMemberTodos({ memberId, cursor: pageParam }),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) =>
      lastPage.hasNext ? (lastPage.nextCursor ?? undefined) : undefined,
    staleTime: TODO_QUERY_STALE_TIME,
    enabled: enabled && Number.isFinite(memberId) && memberId > 0,
  });

// 완료된 할 일 리스트 조회
export const useInfiniteCompletedTodosQuery = () => {
  return useInfiniteQuery({
    queryKey: queryKeys.todo.completed(),
    queryFn: ({ pageParam }) => getCompletedTodos({ cursor: pageParam }),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) =>
      lastPage.hasNext ? (lastPage.nextCursor ?? undefined) : undefined,
    staleTime: TODO_QUERY_STALE_TIME,
  });
};

// 할 일 상세 조회
export const useTodoDetailQuery = (instanceId: TodoInstanceId | null) => {
  return useQuery({
    queryKey: queryKeys.todo.detail(instanceId ?? -1),
    queryFn: () => getTodoDetail(instanceId as TodoInstanceId),
    enabled: instanceId != null,
    staleTime: TODO_QUERY_STALE_TIME,
  });
};

// Mutations
// 할 일 등록
export const useCreateTodoMutation = () => {
  return useMutation({
    mutationFn: createTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.todo.all });
    },
  });
};

// 할 일 수정
export const useUpdateTodoMutation = () => {
  return useMutation({
    mutationFn: updateTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.todo.all });
    },
  });
};

// 할 일 완료
export const useCompleteTodoMutation = () => {
  return useMutation({
    mutationFn: completeTodo,
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.todo.all });
      queryClient.invalidateQueries({
        queryKey: queryKeys.todo.detail(variables.instanceId),
      });
    },
  });
};

// 할 일 인증샷 삭제
export const useDeleteTodoImageMutation = () => {
  return useMutation({
    mutationFn: deleteTodoImage,
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.todo.all });
      queryClient.invalidateQueries({
        queryKey: queryKeys.todo.detail(variables.instanceId),
      });
    },
  });
};

// 할 일 상태 초기화 (완료 취소)
export const useDeleteRecurringTodoMutation = () => {
  return useMutation({
    mutationFn: deleteRecurringTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.todo.all });
    },
  });
};

// 할 일 삭제 (반복 범위 선택)
export const useResetTodoStatusMutation = () => {
  return useMutation({
    mutationFn: resetTodoStatus,
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.todo.all });
      queryClient.invalidateQueries({
        queryKey: queryKeys.todo.detail(variables.instanceId),
      });
    },
  });
};
