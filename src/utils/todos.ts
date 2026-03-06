import type { Todo } from '@/types/todo';
import { toLocalDateTime } from '@/utils/date';

type TodoWithLocal = Todo & {
  local: {
    dueDate: string;
    completedDate?: string;
  };
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
