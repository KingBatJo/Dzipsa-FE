import type {
  Todo,
  TodoDetailViewState,
  TodoStatusLabel,
  TodoWithLocal,
} from '@/types/todo';
import { formatStatusDateLabel, toLocalDateTime } from '@/utils/date';

export const sortByCreatedAtAsc = (a: TodoWithLocal, b: TodoWithLocal) =>
  a.createdAt.localeCompare(b.createdAt);

export const sortByDueAtThenCreatedAtAsc = (
  a: TodoWithLocal,
  b: TodoWithLocal
) => {
  const dueCompare = a.dueAt.localeCompare(b.dueAt);
  if (dueCompare !== 0) return dueCompare;
  return a.createdAt.localeCompare(b.createdAt);
};

// 날짜 차이 계산
export const getDateDiffDays = (fromDate: string, toDate: string) => {
  const from = new Date(fromDate);
  const to = new Date(toDate);

  const fromStart = new Date(
    from.getFullYear(),
    from.getMonth(),
    from.getDate()
  );
  const toStart = new Date(to.getFullYear(), to.getMonth(), to.getDate());

  return Math.floor(
    (toStart.getTime() - fromStart.getTime()) / (1000 * 60 * 60 * 24)
  );
};

// Todo에 local 시간 정보 붙이기
export const addLocalToTodos = (todos: Todo[]): TodoWithLocal[] =>
  todos.map((t) => ({
    ...t,
    local: {
      dueDate: toLocalDateTime(t.dueAt).date,
      completedDate: t.completedAt
        ? toLocalDateTime(t.completedAt).date
        : undefined,
    },
  }));

// 지연 여부
export const isTodoDelayed = (todo: TodoWithLocal, today: string) => {
  if (todo.completed && todo.completedAt) {
    return todo.local.completedDate! > todo.local.dueDate;
  }

  return todo.local.dueDate < today;
};

// 상태 라벨
export const getTodoStatusLabel = (
  todo: TodoWithLocal,
  today: string
): TodoStatusLabel => {
  const delayed = isTodoDelayed(todo, today);

  if (todo.completed) {
    return delayed ? '지연 완료' : '완료';
  }

  return delayed ? '지연' : '진행중';
};

// 상태 하단 라벨
export const getTodoStatusSubLabel = (todo: TodoWithLocal, today: string) => {
  const statusLabel = getTodoStatusLabel(todo, today);

  if (statusLabel === '지연') {
    return `${getDateDiffDays(todo.dueAt, today)}일 지연`;
  }

  if (statusLabel === '지연 완료' && todo.completedAt) {
    return `${getDateDiffDays(todo.dueAt, todo.completedAt)}일 지연, ${formatStatusDateLabel(todo.completedAt)}`;
  }

  if (statusLabel === '완료' && todo.completedAt) {
    return formatStatusDateLabel(todo.completedAt);
  }

  return;
};

// 상세 보기용 상태
export const getTodoDetailViewState = (
  todo: TodoWithLocal,
  myId: number
): TodoDetailViewState => {
  const isMine = todo.assigneeId === myId;
  const isCompleted = todo.completed;
  const hasProofImage = Boolean(todo.proofImageUrl);

  return {
    isMine,
    isCompleted,
    hasProofImage,
    canEdit: isMine,
    canDelete: isMine,
    canConfirmComplete: isMine && !isCompleted,
    canPhotoComplete: isMine && !isCompleted,
    canRevertToInProgress: isMine && isCompleted,
    canAddProofImage: isMine && isCompleted && !hasProofImage,
  };
};

// Todo 섹션 분류
export const getTodoSections = (todos: TodoWithLocal[], today: string) => {
  // 오늘 할 일 (완료 포함 - 요약용)
  const todayTodos = todos
    .filter((t) => t.local.dueDate === today)
    .sort(sortByCreatedAtAsc); // 오래된 순

  // 놓친 할 일 (미완료만)
  const missedTodos = todos
    .filter((t) => t.local.dueDate < today && !t.completed)
    .sort(sortByDueAtThenCreatedAtAsc); // 오래된 순

  // 예정된 할 일 (미완료만)
  const upcomingTodos = todos
    .filter((t) => t.local.dueDate > today && !t.completed)
    .sort(sortByDueAtThenCreatedAtAsc); // 오래된 순

  // 완료된 할 일
  const completedTodos = todos
    .filter((t) => t.completed && t.completedAt)
    .sort((a, b) => b.completedAt!.localeCompare(a.completedAt!)); // 최신순

  return { todayTodos, missedTodos, upcomingTodos, completedTodos };
};
