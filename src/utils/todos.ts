import type {
  Todo,
  TodoDetailViewState,
  TodoStatusLabel,
  TodoWithLocal,
} from '@/types/todo';

import { toLocalDateTime } from '@/utils/date';

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

  return delayed ? '지연' : '진행';
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
    .sort((a, b) => a.dueAt.localeCompare(b.dueAt)); // 오래된 순

  // 놓친 할 일 (미완료만)
  const missedTodos = todos
    .filter((t) => t.local.dueDate < today && !t.completed)
    .sort((a, b) => b.dueAt.localeCompare(a.dueAt)); // 최신순

  // 예정된 할 일 (미완료만)
  const upcomingTodos = todos
    .filter((t) => t.local.dueDate > today && !t.completed)
    .sort((a, b) => a.dueAt.localeCompare(b.dueAt)); // 오래된 순

  // 완료된 할 일
  const completedTodos = todos
    .filter((t) => t.completed && t.completedAt)
    .sort((a, b) => b.dueAt!.localeCompare(a.dueAt!)); // 최신순

  return { todayTodos, missedTodos, upcomingTodos, completedTodos };
};
