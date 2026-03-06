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
import { User2 } from 'lucide-react';
import UserAvatar from '@/components/common/UserAvatar';
import { formatDueAt } from '@/utils/date';

type HouseTodosSummaryProps = {
  total: number;
  completed: number;
  userName: string;
  myRemaining: number;
  message: string;
};

// 남은 할 일에 따른 안내 메시지
const getTodosSummaryMessage = (
  remaining: number,
  myRemaining: number,
  userName: string
) => {
  if (remaining === 0) return '남은 할 일이 없어요';
  if (myRemaining === 0) return `남은 할 일 중 ${userName}님의 할 일은 없어요`;

  return `${userName}님은 할 일 ${myRemaining}개가 남아있어요`;
};

// 상단 요약 카드
const HouseTodosSummary = ({
  total,
  completed,
  userName,
  myRemaining,
  message,
}: HouseTodosSummaryProps) => {
  const remaining = Math.max(total - completed, 0);

  return (
    <Card className="relative mb-4 rounded-md border-none bg-[#BDBDBD] p-4">
      <div className="text-sm font-medium">
        <p>
          오늘 할 일 {total}개 중 {completed}개가 완료되었어요!
        </p>
        <p>{message}</p>
        <p>{getTodosSummaryMessage(remaining, myRemaining, userName)}</p>
      </div>

      {/* 임시 */}
      <User2 className="absolute -right-3 -bottom-3 h-38 w-38 text-[#DEDEDE]" />
    </Card>
  );
};

const HouseTodosTab = () => {
  // 임시
  const myId = MOCK_MY_ID;
  const today = MOCK_TODAY;

  const myName = mockMembers.find((m) => m.id === myId)?.name ?? '나';
  const membersById = new Map(mockMembers.map((m) => [m.id, m]));

  const todos = addLocalToTodos(mockTodoList);

  // 할 일 섹션 분류
  const { todayTodos, missedTodos, upcomingTodos } = getTodoSections(
    todos,
    today
  );

  // todayTodos 돌면서 통계 계산
  const { total, completed, myRemaining } = todayTodos.reduce(
    (acc, t) => {
      acc.total += 1;
      if (t.completed) acc.completed += 1;
      if (t.assigneeId === myId && !t.completed) acc.myRemaining += 1;
      return acc;
    },
    { total: 0, completed: 0, myRemaining: 0 }
  );

  // 놓친 할 일 (미완료만 - 렌더링용)
  const visibleTodayTodos = todayTodos.filter((t) => !t.completed);

  return (
    <div className="space-y-8">
      {missedTodos.length > 0 && (
        <ListSection title="놓친 할 일이 있어요!">
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
            />
          ))}
        </ListSection>
      )}

      <ListSection title="오늘 할 일">
        <HouseTodosSummary
          total={total}
          completed={completed}
          myRemaining={myRemaining}
          userName={myName}
          message="오늘 하루 정말 수고하셨어요!"
        />

        {visibleTodayTodos.length === 0 ? (
          <EmptyState message="오늘 할 일이 없어요" />
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
            />
          ))
        )}
      </ListSection>

      <ListSection title="예정된 모든 할 일">
        {upcomingTodos.length === 0 ? (
          <EmptyState message="예정된 할 일이 없어요" />
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
            />
          ))
        )}
      </ListSection>
    </div>
  );
};

export default HouseTodosTab;
