export type TodoStatus = 'PENDING' | 'COMPLETED';

export type MyTodosCursorParams = {
  missedCursor?: string;
  todayCursor?: string;
  upcomingCursor?: string;
};

export type TodoPageParams = {
  cursor?: string;
  size?: number;
};

export type MyTodoListItem = {
  instanceId: number;
  title: string;
  memo: string | null;
  assigneeId: number;
  assigneeNickname: string;
  profileImageUrl: string | null;
  status: TodoStatus;
  targetDate: string; // yyyy-MM-dd
  delayDays: number;
  imageUrl: string | null;
  completedAt: string | null; // yyyy.MM.dd
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

export type GetMyTodayTodosParams = TodoPageParams;
export type GetMyTodayTodosResponse = TodoCursorPageResponse;

export type GetMyMissedTodosParams = TodoPageParams;
export type GetMyMissedTodosResponse = TodoCursorPageResponse;

export type GetMyUpcomingTodosParams = TodoPageParams;
export type GetMyUpcomingTodosResponse = TodoCursorPageResponse;

// 할 일 상세 조회
export type TodoInstanceId = number;

export type TodoDetailStatus = '진행' | '지연' | '완료' | '지연완료';

export type TodoDetailResponse = {
  instanceId: TodoInstanceId;
  title: string;
  targetDate: string; // yyyy-MM-dd
  memo: string | null;
  assigneeId: number;
  assigneeNickname: string;
  profileImageUrl: string | null;
  recurringInfo: string;
  status: TodoDetailStatus;
  statusDetail: string;
  imageUrl: string | null;
  owner: boolean;
};

// 할 일 등록
export type TodoRecurringType = 'NONE' | 'WEEKLY' | 'MONTHLY';

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
