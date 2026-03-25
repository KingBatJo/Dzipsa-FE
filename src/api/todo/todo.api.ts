import type {
  CompleteTodoParams,
  CompleteTodoResponse,
  CreateTodoRequest,
  CreateTodoResponse,
  DeleteRecurringTodoParams,
  DeleteRecurringTodoResponse,
  DeleteTodoImageParams,
  DeleteTodoImageResponse,
  GetCompletedTodosParams,
  GetCompletedTodosResponse,
  GetHouseAllTodosParams,
  GetHouseAllTodosResponse,
  GetHouseDelayedTodosParams,
  GetHouseDelayedTodosResponse,
  GetHouseMemberTodosParams,
  GetHouseMemberTodosResponse,
  GetHouseTodayTodosParams,
  GetHouseTodayTodosResponse,
  GetHouseTodoStatsResponse,
  GetMyMissedTodosParams,
  GetMyMissedTodosResponse,
  GetMyTodayTodosParams,
  GetMyTodayTodosResponse,
  GetMyTodosAllResponse,
  GetMyUpcomingTodosParams,
  GetMyUpcomingTodosResponse,
  MyTodosCursorParams,
  ResetTodoStatusParams,
  ResetTodoStatusResponse,
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

// 할 일 인증샷 삭제
export const deleteTodoImage = async ({
  instanceId,
}: DeleteTodoImageParams): Promise<DeleteTodoImageResponse> => {
  await apiClient.delete(`/api/todos/instances/${instanceId}/image`);
};

// 할 일 삭제 (반복 범위 선택)
export const deleteRecurringTodo = async ({
  instanceId,
  scope,
}: DeleteRecurringTodoParams): Promise<DeleteRecurringTodoResponse> => {
  await apiClient.delete(`/api/todos/recurring/${instanceId}`, {
    data: { scope },
  });
};

// 완료된 할 일 리스트 조회
export const getCompletedTodos = async (
  params?: GetCompletedTodosParams
): Promise<GetCompletedTodosResponse> => {
  const { data } = await apiClient.get<GetCompletedTodosResponse>(
    '/api/todos/completed',
    { params }
  );
  return data;
};

// 할 일 상태 초기화 (완료 취소)
export const resetTodoStatus = async ({
  instanceId,
}: ResetTodoStatusParams): Promise<ResetTodoStatusResponse> => {
  await apiClient.patch(`/api/todos/instances/${instanceId}/reset`);
};

// 우리집 할 일 - 넛지 및 통계 조회
export const getHouseTodoStats =
  async (): Promise<GetHouseTodoStatsResponse> => {
    const { data } = await apiClient.get<GetHouseTodoStatsResponse>(
      `/api/todos/room/stats`
    );

    return data;
  };

// 우리집 할 일 - 오늘/지연/전체 조회
export const getHouseTodayTodos = async (
  params?: GetHouseTodayTodosParams
): Promise<GetHouseTodayTodosResponse> => {
  const { data } = await apiClient.get<GetHouseTodayTodosResponse>(
    '/api/todos/room/today',
    { params }
  );
  return data;
};

export const getHouseDelayedTodos = async (
  params?: GetHouseDelayedTodosParams
): Promise<GetHouseDelayedTodosResponse> => {
  const { data } = await apiClient.get<GetHouseDelayedTodosResponse>(
    '/api/todos/room/delayed',
    { params }
  );
  return data;
};

export const getHouseAllTodos = async (
  params?: GetHouseAllTodosParams
): Promise<GetHouseAllTodosResponse> => {
  const { data } = await apiClient.get<GetHouseAllTodosResponse>(
    '/api/todos/room/all',
    { params }
  );
  return data;
};

// 우리집 할 일 - 구성원별 할 일 조회
export const getHouseMemberTodos = async ({
  memberId,
  cursor,
}: GetHouseMemberTodosParams): Promise<GetHouseMemberTodosResponse> => {
  const { data } = await apiClient.get<GetHouseMemberTodosResponse>(
    `/api/todos/room/members/${memberId}`,
    { params: { cursor } }
  );
  return data;
};
