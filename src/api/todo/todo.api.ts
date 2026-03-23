import type {
  GetMyMissedTodosParams,
  GetMyMissedTodosResponse,
  GetMyTodayTodosParams,
  GetMyTodayTodosResponse,
  GetMyTodosAllResponse,
  GetMyUpcomingTodosParams,
  GetMyUpcomingTodosResponse,
  MyTodosCursorParams,
  TodoDetailResponse,
  TodoInstanceId,
} from '@/api/todo/todo.types';

import { apiClient } from '@/api/client';

// 나의 할 일 통합 조회 (지연/오늘/예정, 커서 기반)
export const getMyTodosAll = async (
  params?: MyTodosCursorParams
): Promise<GetMyTodosAllResponse> => {
  const { data } = await apiClient.get<GetMyTodosAllResponse>(
    '/api/todos/me/all',
    { params }
  );
  return data;
};

// 오늘 할 일 페이징 조회
export const getMyTodayTodos = async (
  params?: GetMyTodayTodosParams
): Promise<GetMyTodayTodosResponse> => {
  const { data } = await apiClient.get<GetMyTodayTodosResponse>(
    '/api/todos/me/today',
    { params }
  );
  return data;
};

// 놓친 할 일 페이징 조회
export const getMyMissedTodos = async (
  params?: GetMyMissedTodosParams
): Promise<GetMyMissedTodosResponse> => {
  const { data } = await apiClient.get<GetMyMissedTodosResponse>(
    '/api/todos/me/missed',
    { params }
  );
  return data;
};

// 예정된 할 일 페이징 조회
export const getMyUpcomingTodos = async (params?: GetMyUpcomingTodosParams) => {
  const { data } = await apiClient.get<GetMyUpcomingTodosResponse>(
    '/api/todos/me/upcoming',
    { params }
  );
  return data;
};

// 할 일 상세 조회
export const getTodoDetail = async (
  instanceId: TodoInstanceId
): Promise<TodoDetailResponse> => {
  const { data } = await apiClient.get<TodoDetailResponse>(
    `/api/todos/instances/${instanceId}`
  );
  return data;
};
