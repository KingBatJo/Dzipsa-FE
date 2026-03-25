export type TodoStatus = 'PENDING' | 'COMPLETED';

export type MyTodosCursorParams = {
  missedCursor?: string;
  todayCursor?: string;
  upcomingCursor?: string;
};

export type CursorParams = {
  cursor?: string;
};

// 할 일 등록/수정 공통
export type TodoRecurringType = 'NONE' | 'WEEKLY' | 'MONTHLY';

export type BaseTodoListItem = {
  instanceId: number;
  title: string;
  memo: string | null;
  assigneeId: number;
  assigneeNickname: string;
  profileImageUrl: string | null;
  status: TodoStatus;
  targetDate: string;
  delayDays: number;
  imageUrl: string | null;
  recurringType?: TodoRecurringType;
  repeatDays?: string | null;
};

export type MyTodoListItem = BaseTodoListItem & {
  completedAt: string | null;
};

export type CursorSection<T> = {
  content: T[];
  hasNext: boolean;
  nextCursor: string | null;
};

export type TodoCursorPageResponse = CursorSection<MyTodoListItem>;

export type GetMyTodosAllResponse = {
  missedTodos: CursorSection<MyTodoListItem>;
  todayTodos: CursorSection<MyTodoListItem>;
  upcomingTodos: CursorSection<MyTodoListItem>;
};

export type GetMyTodayTodosParams = CursorParams;
export type GetMyTodayTodosResponse = TodoCursorPageResponse;

export type GetMyMissedTodosParams = CursorParams;
export type GetMyMissedTodosResponse = TodoCursorPageResponse;

export type GetMyUpcomingTodosParams = CursorParams;
export type GetMyUpcomingTodosResponse = TodoCursorPageResponse;

// 할 일 상세 조회
export type TodoInstanceId = number;

export type TodoDetailResponse = {
  todoId: number;
  instanceId: TodoInstanceId;
  title: string;
  memo: string | null;
  assigneeId: number;
  assigneeNickname: string;
  profileImageUrl: string | null;
  targetDate: string; // yyyy-MM-dd
  recurringType: TodoRecurringType;
  repeatDays: string | null;
  startDate: string; // yyyy-MM-dd
  endDate: string | null; // yyyy-MM-dd

  isRandom: boolean;
  status: TodoStatus;
  completedAt: string | null; // ISO 8601
  delayDays: number;
  imageUrl: string | null;
  owner: boolean;
  writer: boolean;
};

// 할 일 등록
export type CreateTodoRequest = {
  title: string;
  targetDate: string | null; // yyyy-MM-dd
  recurringType: TodoRecurringType;
  repeatDays: string | null; // "1,3,5" | "15" | null
  startDate: string | null; // yyyy-MM-dd
  endDate: string | null; // yyyy-MM-dd
  assigneeId: number | null;
  isRandom: boolean;
  memo: string | null;
};

export type CreateTodoResponse = {
  todoId: number;
  instanceId: number | null;
  title: string;
  memo: string | null;
  targetDate: string;
  assigneeId: number;
  assigneeNickname: string;
  isRandom: boolean;
  recurringType: TodoRecurringType;
  repeatDays: string | null;
  startDate: string;
  endDate: string | null;
};

// 할 일 수정
export type TodoId = number;

export type UpdateTodoRequest = CreateTodoRequest;
export type UpdateTodoResponse = CreateTodoResponse;

export type UpdateTodoParams = {
  todoId: TodoId;
  payload: UpdateTodoRequest;
};

// 할 일 완료
export type CompleteTodoParams = {
  instanceId: TodoInstanceId;
  image?: File | null;
};

export type CompleteTodoResponse = void;

// 할 일 인증샷 삭제
export type DeleteTodoImageParams = {
  instanceId: TodoInstanceId;
};

export type DeleteTodoImageResponse = void;

// 완료된 할 일 리스트 조회
export type GetCompletedTodosParams = CursorParams;

export type CompletedTodoListItem = BaseTodoListItem & {
  completedAt: string; // 완료 리스트에서는 null 아님
};

export type GetCompletedTodosResponse = CursorSection<CompletedTodoListItem>;

// 할 일 상태 초기화 (완료 취소)
export type ResetTodoStatusParams = {
  instanceId: TodoInstanceId;
};

export type ResetTodoStatusResponse = void;

// 할 일 삭제 (반복 범위 선택)
export type DeleteRecurringTodoScope =
  | 'ONLY_THIS'
  | 'SINCE_THIS'
  | 'ALL_RECURRING';

export type DeleteRecurringTodoParams = {
  instanceId: TodoInstanceId;
  scope: DeleteRecurringTodoScope;
};

export type DeleteRecurringTodoResponse = void;

// 우리집 할 일 - 넛지 및 통계 조회
export type HouseTodoMemberStat = {
  userId: number;
  nickname: string;
  profileImageUrl: string;
  remainingCount: number;
};

export type GetHouseTodoStatsResponse = {
  totalRoomTodoCount: number;
  completedRoomTodoCount: number;
  myRemainingTodoCount: number;

  todayTotalCount: number;
  delayedTotalCount: number;
  allTotalCount: number;

  memberStats: HouseTodoMemberStat[];
};

// 우리집 할 일 - 오늘/지연/모든 할 일 조회
export type GetHouseTodayTodosParams = CursorParams;
export type GetHouseTodayTodosResponse = TodoCursorPageResponse;

export type GetHouseDelayedTodosParams = CursorParams;
export type GetHouseDelayedTodosResponse = TodoCursorPageResponse;

export type GetHouseAllTodosParams = CursorParams;
export type GetHouseAllTodosResponse = TodoCursorPageResponse;

// 우리집 할 일 - 구성원별 할 일 조회
export type GetHouseMemberTodosParams = CursorParams & {
  memberId: number;
};
export type GetHouseMemberTodosResponse = TodoCursorPageResponse;
