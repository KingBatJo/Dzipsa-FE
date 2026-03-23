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

// 상세 조회
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
