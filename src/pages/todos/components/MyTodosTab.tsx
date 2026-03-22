import { MOCK_MY_ID, MOCK_TODAY, mockTodoList } from '@/mocks/mockData';
import {
  addLocalToTodos,
  getDateDiffDays,
  getTodoSections,
  isTodoDelayed,
} from '@/utils/todos';

import EmptyState from '@/components/common/EmptyState';
import ListItemCard from '@/components/common/ListItemCard';
import ListSection from '@/components/common/ListSection';
import type { TodoWithLocal } from '@/types/todo';
import { cn } from '@/lib/utils';
import { formatDueDateLabel } from '@/utils/date';

type MyTodosTabProps = {
  onTodoClick?: (todo: TodoWithLocal) => void;
};

type TodoCompleteButtonProps = {
  isDelayed?: boolean;
  onClick?: () => void;
};

const TODO_COMPLETE_BUTTON_COLORS = {
  normal: {
    base: '#E4E4E7CC',
    hover: '#8F8F8FCC',
    active: '#565656CC',
  },
  delayed: {
    base: '#A68F8FCC',
    hover: '#8F8F8FCC', // 임시. delayed 전용 hover 색으로 변경
    active: '#565656CC', // 임시. delayed 전용 active 색으로 변경
  },
} as const;

const TodoCompleteButton = ({
  isDelayed = false,
  onClick,
}: TodoCompleteButtonProps) => {
  const colors = isDelayed
    ? TODO_COMPLETE_BUTTON_COLORS.delayed
    : TODO_COMPLETE_BUTTON_COLORS.normal;

  return (
    <button
      type="button"
      aria-label="할일 완료"
      onClick={onClick}
      className="group flex h-6 w-6 items-center justify-center"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M12 3C19.2 3 21 4.8 21 12C21 19.2 19.2 21 12 21C4.8 21 3 19.2 3 12C3 4.8 4.8 3 12 3Z"
          className={cn(
            'transition-colors duration-150',
            `fill-[${colors.base}]`,
            `group-hover:fill-[${colors.hover}]`,
            `group-active:fill-[${colors.active}]`
          )}
        />
      </svg>
    </button>
  );
};

const MyTodosTab = ({ onTodoClick }: MyTodosTabProps) => {
  // 임시
  const myId = MOCK_MY_ID;
  const today = MOCK_TODAY;

  const todos = addLocalToTodos(mockTodoList);

  // 내 할 일만
  const myTodos = todos.filter((todo) => todo.assigneeId === myId);

  // 할 일 섹션 분류
  const { todayTodos, missedTodos, upcomingTodos } = getTodoSections(
    myTodos,
    today
  );

  // 놓친 할 일 (미완료만 - 렌더링용)
  const visibleTodayTodos = todayTodos.filter((todo) => !todo.completed);

  return (
    <div className="space-y-8">
      {missedTodos.length > 0 && (
        <ListSection title="놓친 할 일이 있어요 !">
          {missedTodos.map((todo) => {
            const isDelayed = isTodoDelayed(todo, today);

            return (
              <ListItemCard
                key={todo.id}
                title={todo.title}
                subtitle={formatDueDateLabel(todo.dueAt)}
                right={<TodoCompleteButton isDelayed={isDelayed} />}
                onClick={() => onTodoClick?.(todo)}
                isDelayed={isDelayed}
                badge={`D+${getDateDiffDays(todo.dueAt, today)}`}
              />
            );
          })}
        </ListSection>
      )}

      <ListSection title="Today">
        {visibleTodayTodos.length === 0 ? (
          <EmptyState message="오늘 할 일이 없어요" />
        ) : (
          visibleTodayTodos.map((todo) => (
            <ListItemCard
              key={todo.id}
              title={todo.title}
              subtitle={formatDueDateLabel(todo.dueAt)}
              right={<TodoCompleteButton />}
              onClick={() => onTodoClick?.(todo)}
            />
          ))
        )}
      </ListSection>

      <ListSection title="예정된 할 일">
        {upcomingTodos.length === 0 ? (
          <EmptyState message="예정된 할 일이 없어요" />
        ) : (
          upcomingTodos.map((todo) => (
            <ListItemCard
              key={todo.id}
              title={todo.title}
              subtitle={formatDueDateLabel(todo.dueAt)}
              right={<TodoCompleteButton />}
              onClick={() => onTodoClick?.(todo)}
            />
          ))
        )}
      </ListSection>
    </div>
  );
};

export default MyTodosTab;
