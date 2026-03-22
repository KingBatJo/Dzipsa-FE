import {
  MOCK_MY_ID,
  MOCK_TODAY,
  mockMembers,
  mockTodoList,
} from '@/mocks/mockData';
import { addLocalToTodos, getTodoSections } from '@/utils/todos';

import { ChevronRight } from 'lucide-react';
import ListItemCard from '@/components/common/ListItemCard';
import ListSection from '@/components/common/ListSection';
import ReportBubble from '@/components/common/ReportBubble';
import UserAvatar from '@/components/common/UserAvatar';
import dzipsaCharacter from '@/assets/dzipsa.svg';

type HouseTodosSummaryProps = {
  total: number;
  completed: number;
  userName: string;
  myRemaining: number;
};

type HouseTodosTabProps = {
  onCategoryClick?: (type: 'today' | 'missed' | 'all') => void;
  onMemberClick?: (memberId: number) => void;
};

type CountIndicatorProps = {
  count: number;
};

type SummaryMessage = {
  title: string;
  description: string;
};

// 오늘 할 일 상태에 따른 요약 메시지 생성
const getSummaryMessage = ({
  total,
  completed,
  userName,
  myRemaining,
}: HouseTodosSummaryProps): SummaryMessage => {
  const remaining = Math.max(total - completed, 0);

  if (total === 0) {
    return {
      title: '오늘 우리집은 할 일이 없네요!',
      description: `${userName}님, 여유로운 하루를 보내보세요 ☕`,
    };
  }

  if (completed === total) {
    return {
      title: '오늘 우리집 할 일 모두 완료!',
      description: `${userName}님, 오늘은 푹 쉬셔도 좋겠어요.`,
    };
  }

  if (myRemaining === 0) {
    return {
      title: `${userName}님은 오늘 할 일을 다 하셨네요!`,
      description: `구성원분들의 남은 ${remaining}개 할 일도 확인해 보세요`,
    };
  }

  return {
    title: `우리집 할 일 총 ${total}개 중 ${completed}개 완료! ✅`,
    description: `${userName}님의 남은 ${myRemaining}개의 할 일도 확인해 볼까요?`,
  };
};

// 집사 캐릭터 + 요약 말풍선 UI 컴포넌트
const HouseTodosSummary = ({
  total,
  completed,
  userName,
  myRemaining,
}: HouseTodosSummaryProps) => {
  const summaryCopy = getSummaryMessage({
    total,
    completed,
    userName,
    myRemaining,
  });

  return (
    <div className="flex">
      <img src={dzipsaCharacter} className="h-15 w-15" />

      <ReportBubble showPointer>
        <p>{summaryCopy.title}</p>
        <p>{summaryCopy.description}</p>
      </ReportBubble>
    </div>
  );
};

// 리스트 오른쪽에 공통적으로 표시되는 개수
const CountIndicator = ({ count }: CountIndicatorProps) => {
  return (
    <div className="flex items-center gap-1 text-zinc-500">
      <span className="text-base leading-[19px] font-semibold">{count}건</span>
      <ChevronRight className="text-muted-foreground h-5 w-5" />
    </div>
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

  const categoryCards: Array<{
    title: string;
    type: 'today' | 'missed' | 'all';
    count: number;
  }> = [
    { title: '오늘 할 일', type: 'today', count: todayActiveTodos.length },
    { title: '지연된 할 일', type: 'missed', count: missedTodos.length },
    { title: '모든 할 일', type: 'all', count: activeTodos.length },
  ];

  return (
    <div className="flex flex-col gap-7">
      <HouseTodosSummary
        total={total}
        completed={completed}
        myRemaining={myRemaining}
        userName={myName}
      />

      <ListSection title="전체 할 일">
        {categoryCards.map((card) => (
          <ListItemCard
            key={card.type}
            title={card.title}
            right={<CountIndicator count={card.count} />}
            onClick={() => onCategoryClick?.(card.type)}
          />
        ))}
      </ListSection>

      <ListSection title="구성원 할 일">
        {memberTodoCounts.map((member) => (
          <ListItemCard
            key={member.memberId}
            title={member.name}
            right={<CountIndicator count={member.count} />}
            left={<UserAvatar size="xs" src={member.profileImage} />}
            onClick={() => onMemberClick?.(member.memberId)}
          />
        ))}
      </ListSection>
    </div>
  );
};

export default HouseTodosTab;
