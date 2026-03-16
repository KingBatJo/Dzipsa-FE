import {
  MOCK_MY_ID,
  MOCK_TODAY,
  mockMembers,
  mockTodoList,
} from '@/mocks/mockData';
import { addLocalToTodos, getTodoSections } from '@/utils/todos';

import { Card } from '@/components/ui/card';
import { ChevronRight } from 'lucide-react';
import UserAvatar from '@/components/common/UserAvatar';
import dzipsaCharacter from '@/assets/dzipsa.svg';

type HouseTodosSummaryProps = {
  total: number;
  completed: number;
  userName: string;
  myRemaining: number;
  message: string;
};

type HouseTodosTabProps = {
  onCategoryClick?: (type: 'today' | 'missed' | 'all') => void;
  onMemberClick?: (memberId: number) => void;
};

type SummaryItemProps = {
  title: string;
  count: number;
  onClick?: () => void;
  left?: React.ReactNode;
};

const getTodosSummaryMessage = (
  remaining: number,
  myRemaining: number,
  userName: string
) => {
  if (remaining === 0) return '오늘 할 일이 없어요';
  if (myRemaining === 0) return `오늘 할 일 중 ${userName}님의 할 일이 없어요`;

  return `남은 할 일 중 ${userName}님의 할 일이 ${myRemaining}개 남있어요`;
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
          오늘 우리집 할 일 {total}개 중 벌써 {completed}개가 완료됐어요
        </p>
        <p>{getTodosSummaryMessage(remaining, myRemaining, userName)}</p>
        <p>{message}</p>
      </div>
    </Card>
  );
};

const SummaryItem = ({ title, count, onClick, left }: SummaryItemProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="hover:bg-secondary flex w-full items-center justify-between rounded-lg border border-[#DDDDDD] px-4 py-4"
    >
      <div className="flex items-center gap-2">
        {left}
        <span className="text-base font-semibold">{title}</span>
      </div>

      <div className="flex items-center gap-1">
        <span className="text-sm font-semibold">{count}건</span>
        <ChevronRight className="text-muted-foreground h-5 w-5" />
      </div>
    </button>
  );
};

const HouseTodosTab = ({
  onCategoryClick,
  onMemberClick,
}: HouseTodosTabProps) => {
  const myId = MOCK_MY_ID;
  const today = MOCK_TODAY;

  const myName = mockMembers.find((member) => member.id === myId)?.name ?? '';
  const todos = addLocalToTodos(mockTodoList);

  const { todayTodos, missedTodos } = getTodoSections(todos, today);

  const activeTodos = todos.filter((todo) => !todo.completed);
  const todayActiveTodos = todayTodos.filter((todo) => !todo.completed);

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

  const memberTodoCounts = mockMembers
    .filter((member) => member.id !== myId)
    .map((member) => ({
      memberId: member.id,
      name: member.name,
      profileImage: member.profileImage,
      count: activeTodos.filter((todo) => todo.assigneeId === member.id).length,
    }));

  return (
    <div className="space-y-5">
      <HouseTodosSummary
        total={total}
        completed={completed}
        myRemaining={myRemaining}
        userName={myName}
        message="우리집을 위해 힘내볼까요?"
      />

      <section className="space-y-3">
        <h2 className="text-base font-semibold">전체 할 일</h2>

        <div className="space-y-2">
          <SummaryItem
            title="오늘 할 일"
            count={todayActiveTodos.length}
            onClick={() => onCategoryClick?.('today')}
          />
          <SummaryItem
            title="지연된 할 일"
            count={missedTodos.length}
            onClick={() => onCategoryClick?.('missed')}
          />
          <SummaryItem
            title="모든 할 일"
            count={activeTodos.length}
            onClick={() => onCategoryClick?.('all')}
          />
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-semibold">구성원 할 일</h2>

        <div className="space-y-2">
          {memberTodoCounts.map((member) => (
            <SummaryItem
              key={member.memberId}
              title={member.name}
              count={member.count}
              left={<UserAvatar src={member.profileImage} />}
              onClick={() => onMemberClick?.(member.memberId)}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default HouseTodosTab;
