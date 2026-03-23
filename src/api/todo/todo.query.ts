import type { MyTodosCursorParams } from './todo.types';
import { getMyTodosAll } from './todo.api';
import { queryKeys } from '@/lib/queryKeys';
import { useQuery } from '@tanstack/react-query';

// 첫 페이지(커서 없음) 또는 특정 커서 상태 조회
export const useMyTodosAllQuery = (params?: MyTodosCursorParams) => {
  return useQuery({
    queryKey: queryKeys.todo.my.all(params),
    queryFn: () => getMyTodosAll(params),
    staleTime: 1000 * 60 * 3,
  });
};
