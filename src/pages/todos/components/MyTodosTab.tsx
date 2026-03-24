import { Button } from '@/components/ui/button';
import EmptyState from '@/components/common/EmptyState';
import ListItemCard from '@/components/common/ListItemCard';
import ListSection from '@/components/common/ListSection';
import type { TodoInstanceId } from '@/api/todo/todo.types';
import { cn } from '@/lib/utils';
import dzipsaCharacter from '@/assets/dzipsa.svg';
import { formatDueDateLabel } from '@/utils/date';
import { useMyTodosAllQuery } from '@/api/todo/todo.query';
import { useNavigate } from 'react-router-dom';

type MyTodosTabProps = {
  onTodoClick?: (instanceId: TodoInstanceId) => void;
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
  const navigate = useNavigate();
  const { data } = useMyTodosAllQuery();

  const missedTodos = data?.missedTodos.content ?? [];
  const todayTodos = data?.todayTodos.content ?? [];
  const upcomingTodos = data?.upcomingTodos.content ?? [];

  // 놓친 할 일 (미완료만 - 렌더링용)
  const visibleTodayTodos = todayTodos.filter(
    (todo) => todo.status !== 'COMPLETED'
  );

  return (
    <div className="flex flex-col gap-7">
      {missedTodos.length > 0 && (
        <ListSection title="놓친 할 일이 있어요 !">
          {missedTodos.map((todo) => (
            <ListItemCard
              key={todo.instanceId}
              title={todo.title}
              subtitle={formatDueDateLabel(todo.targetDate)}
              right={<TodoCompleteButton isDelayed={todo.delayDays > 0} />}
              onClick={() => onTodoClick?.(todo.instanceId)}
              isDelayed={todo.delayDays > 0}
              badge={todo.delayDays > 0 ? `D+${todo.delayDays}` : undefined}
            />
          ))}
        </ListSection>
      )}

      <ListSection title="Today">
        {visibleTodayTodos.length === 0 ? (
          <EmptyState>
            <img
              src={dzipsaCharacter}
              alt="디집사 캐릭터"
              className="h-[74px] w-20"
            />

            <div className="text-center text-sm font-semibold text-zinc-500">
              <p>오늘 할 일은 무엇인가요?</p>
              <p>첫 번째 할 일을 추가해 보세요!</p>
            </div>

            <Button
              onClick={() => navigate('/todos/new')}
              className="h-12 w-full rounded-[10px] bg-zinc-800"
            >
              첫 할 일 만들기
            </Button>
          </EmptyState>
        ) : (
          visibleTodayTodos.map((todo) => (
            <ListItemCard
              key={todo.instanceId}
              title={todo.title}
              subtitle={formatDueDateLabel(todo.targetDate)}
              right={<TodoCompleteButton />}
              onClick={() => onTodoClick?.(todo.instanceId)}
            />
          ))
        )}
      </ListSection>

      {upcomingTodos.length > 0 && (
        <ListSection title="예정된 할 일">
          {upcomingTodos.map((todo) => (
            <ListItemCard
              key={todo.instanceId}
              title={todo.title}
              subtitle={formatDueDateLabel(todo.targetDate)}
              right={<TodoCompleteButton />}
              onClick={() => onTodoClick?.(todo.instanceId)}
            />
          ))}
        </ListSection>
      )}
    </div>
  );
};

export default MyTodosTab;
