import type { Todo } from '@/types/todo';
import { toLocalDateTime } from './date';

type TodoWithLocal = Todo & {
  local: {
    date: string;
  };
};

// Todo에 local 시간 정보 붙이기
export const addLocalToTodos = (todos: Todo[]): TodoWithLocal[] =>
  todos.map((t) => ({
    ...t,
    local: toLocalDateTime(t.dueAt),
  }));

// Todo 섹션 분류
export const getTodoSections = (todos: TodoWithLocal[], today: string) => {
  // 오늘 할 일 (완료 포함 - 요약용)
  const todayTodos = todos
    .filter((t) => t.local.date === today)
    .sort((a, b) => a.dueAt.localeCompare(b.dueAt)); // 오래된 순

  // 놓친 할 일 (미완료만)
  const missedTodos = todos
    .filter((t) => t.local.date < today && !t.completed)
    .sort((a, b) => b.dueAt.localeCompare(a.dueAt)); // 최신순

  // 예정 된 할 일 (미완료만)
  const upcomingTodos = todos
    .filter((t) => t.local.date > today && !t.completed)
    .sort((a, b) => a.dueAt.localeCompare(b.dueAt)); // 오래된 순

  return { todayTodos, missedTodos, upcomingTodos };
};
