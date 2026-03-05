import { formatDueAt, toLocalDateTime } from '@/utils/date';
import { mockMembers, mockTodoList } from '@/mocks/mockData';

import { Card } from '@/components/ui/card';
import ListItemCard from '@/components/common/ListItemCard';
import ListSection from '@/components/common/ListSection';
import { User2 } from 'lucide-react';
import UserAvatar from '@/components/common/UserAvatar';

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
  const myId = '1';
  const today = '2026-03-06';

  const myName = mockMembers.find((m) => m.id === myId)?.name ?? '나';
  const membersById = new Map(mockMembers.map((m) => [m.id, m]));

  const todos = mockTodoList.map((t) => ({
    ...t,
    local: toLocalDateTime(t.dueAt),
  }));

  const missedTodos = todos.filter((t) => t.local.date < today && !t.completed);
  const todayTodos = todos.filter((t) => t.local.date === today);
  const upcomingTodos = todos.filter((t) => t.local.date > today);

  const total = todayTodos.length;
  const completed = todayTodos.filter((t) => t.completed).length;
  const myRemaining = todayTodos.filter(
    (t) => t.assigneeId === myId && !t.completed
  ).length;

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

        {todayTodos.map((todo) => (
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
        ))}
      </ListSection>

      <ListSection title="우리 집 모든 할 일">
        {upcomingTodos.map((todo) => (
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
        ))}
      </ListSection>
    </div>
  );
};

export default HouseTodosTab;
