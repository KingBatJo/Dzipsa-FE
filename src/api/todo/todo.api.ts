import type {
  GetMyTodosAllResponse,
  MyTodosCursorParams,
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
