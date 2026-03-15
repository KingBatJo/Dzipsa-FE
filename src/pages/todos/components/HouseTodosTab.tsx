import {
  MOCK_MY_ID,
  MOCK_TODAY,
  mockMembers,
  mockTodoList,
} from '@/mocks/mockData';
import { addLocalToTodos, getTodoSections } from '@/utils/todos';

import { Card } from '@/components/ui/card';
import EmptyState from '@/components/common/EmptyState';
import ListItemCard from '@/components/common/ListItemCard';
import ListSection from '@/components/common/ListSection';
import type { TodoWithLocal } from '@/types/todo';
import UserAvatar from '@/components/common/UserAvatar';
import dzipsaCharacter from '@/assets/dzipsa.svg';
import { formatDueAt } from '@/utils/date';

type HouseTodosSummaryProps = {
  total: number;
  completed: number;
  userName: string;
  myRemaining: number;
  message: string;
};

type HouseTodosTabProps = {
  onTodoClick?: (todo: TodoWithLocal) => void;
};

const getTodosSummaryMessage = (
  remaining: number,
  myRemaining: number,
  userName: string
) => {
  if (remaining === 0) return '오늘 할일이 없어요';
  if (myRemaining === 0) return `오늘 할일 중 ${userName}님의 할일이 없어요`;

  return `남은 할일 중 ${userName}님의 할일이 ${myRemaining}개 남있어요`;
};

const HouseTodosSummary = ({
  total,
  completed,
  userName,
  myRemaining,
  message,
}: HouseTodosSummaryProps) => {
  const remaining = Math.max(total - completed, 0);

  return (
    <Card className="relative mb-4 flex items-center rounded-md border-none bg-[#BDBDBD] py-[10px] pr-4">
      <img src={dzipsaCharacter} className="h-20 w-20" />

      <div className="text-center text-xs font-semibold">
        <p>
          오늘 우리집 할일 {total}개 중 벌써 {completed}개가 완료됐어요
        </p>
        <p>{getTodosSummaryMessage(remaining, myRemaining, userName)}</p>
        <p>{message}</p>
      </div>
    </Card>
  );
};

const HouseTodosTab = ({ onTodoClick }: HouseTodosTabProps) => {
  const myId = MOCK_MY_ID;
  const today = MOCK_TODAY;

  const myName = mockMembers.find((member) => member.id === myId)?.name ?? '';
  const membersById = new Map(mockMembers.map((member) => [member.id, member]));

  const todos = addLocalToTodos(mockTodoList);

  const { todayTodos, missedTodos, upcomingTodos } = getTodoSections(
    todos,
    today
  );

  const { total, completed, myRemaining } = todayTodos.reduce(
    (accumulator, todo) => {
      accumulator.total += 1;
      if (todo.completed) accumulator.completed += 1;
      if (todo.assigneeId === myId && !todo.completed)
        accumulator.myRemaining += 1;
      return accumulator;
    },
    { total: 0, completed: 0, myRemaining: 0 }
  );

  const visibleTodayTodos = todayTodos.filter((todo) => !todo.completed);

  return (
    <div className="space-y-8">
      {missedTodos.length > 0 && (
        <ListSection title="밀린 할일이 있어요">
          {missedTodos.map((todo) => (
            <ListItemCard
              key={todo.id}
              title={todo.title}
              subtitle={formatDueAt(todo.dueAt)}
              right={
                <UserAvatar
                  src={membersById.get(todo.assigneeId)?.profileImage}
                />
              }
              className="bg-destructive/10"
              onClick={() => onTodoClick?.(todo)}
            />
          ))}
        </ListSection>
      )}

      <ListSection title="오늘 할일">
        <HouseTodosSummary
          total={total}
          completed={completed}
          myRemaining={myRemaining}
          userName={myName}
          message="우리집을 위해 힘내볼까요?"
        />

        {visibleTodayTodos.length === 0 ? (
          <EmptyState message="오늘 할일이 없어요" />
        ) : (
          visibleTodayTodos.map((todo) => (
            <ListItemCard
              key={todo.id}
              title={todo.title}
              subtitle={formatDueAt(todo.dueAt)}
              right={
                <UserAvatar
                  src={membersById.get(todo.assigneeId)?.profileImage}
                />
              }
              onClick={() => onTodoClick?.(todo)}
            />
          ))
        )}
      </ListSection>

      <ListSection title="예정된 모든 할일">
        {upcomingTodos.length === 0 ? (
          <EmptyState message="예정된 할일이 없어요" />
        ) : (
          upcomingTodos.map((todo) => (
            <ListItemCard
              key={todo.id}
              title={todo.title}
              subtitle={formatDueAt(todo.dueAt)}
              right={
                <UserAvatar
                  src={membersById.get(todo.assigneeId)?.profileImage}
                />
              }
              onClick={() => onTodoClick?.(todo)}
            />
          ))
        )}
      </ListSection>
    </div>
  );
};

export default HouseTodosTab;
