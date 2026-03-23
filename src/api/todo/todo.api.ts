import type {
  CompleteTodoParams,
  CompleteTodoResponse,
  CreateTodoRequest,
  CreateTodoResponse,
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
  UpdateTodoParams,
  UpdateTodoResponse,
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

// 할 일 등록
export const createTodo = async (
  payload: CreateTodoRequest
): Promise<CreateTodoResponse> => {
  const { data } = await apiClient.post<CreateTodoResponse>(
    '/api/todos',
    payload
  );
  return data;
};

// 할 일 수정
export const updateTodo = async (
  params: UpdateTodoParams
): Promise<UpdateTodoResponse> => {
  const { todoId, payload } = params;
  const { data } = await apiClient.put<UpdateTodoResponse>(
    `/api/todos/${todoId}`,
    payload
  );
  return data;
};

// 할 일 완료
export const completeTodo = async ({
  instanceId,
  image,
}: CompleteTodoParams): Promise<CompleteTodoResponse> => {
  const formData = new FormData();

  // 사진 있는 경우만 append (없는 경우 key 생략)
  if (image) {
    formData.append('image', image);
  }

  await apiClient.patch(
    `/api/todos/instances/${instanceId}/complete`,
    formData
  );
};
