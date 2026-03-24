import { ChevronRight } from 'lucide-react';
import ListItemCard from '@/components/common/ListItemCard';
import ListSection from '@/components/common/ListSection';
import ReportBubble from '@/components/common/ReportBubble';
import UserAvatar from '@/components/common/UserAvatar';
import dzipsaCharacter from '@/assets/dzipsa.svg';
import { getProfileOptionById } from '@/api/room/room.utils';
import { useHouseTodoStatsQuery } from '@/api/todo/todo.query';
import { useMeQuery } from '@/api/auth/auth.query';

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
  const { data: me } = useMeQuery();
  const { data: houseStats, isPending } = useHouseTodoStatsQuery();

  const categoryCards: Array<{
    title: string;
    type: 'today' | 'missed' | 'all';
    count: number;
  }> = [
    {
      title: '오늘 할 일',
      type: 'today',
      count: houseStats?.todayTotalCount ?? 0,
    },
    {
      title: '지연된 할 일',
      type: 'missed',
      count: houseStats?.delayedTotalCount ?? 0,
    },
    { title: '모든 할 일', type: 'all', count: houseStats?.allTotalCount ?? 0 },
  ];

  if (isPending) {
    return (
      <div className="flex min-h-[240px] items-center justify-center text-sm font-medium text-zinc-400">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-7">
      <HouseTodosSummary
        total={houseStats?.totalRoomTodoCount ?? 0}
        completed={houseStats?.completedRoomTodoCount ?? 0}
        myRemaining={houseStats?.myRemainingTodoCount ?? 0}
        userName={me?.nickname ?? ''}
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
        {houseStats?.memberStats.map((member) => (
          <ListItemCard
            key={member.userId}
            title={member.nickname}
            right={<CountIndicator count={member.remainingCount} />}
            left={
              <UserAvatar
                size="xs"
                src={getProfileOptionById(member.profileImageUrl).imageUrl}
              />
            }
            onClick={() => onMemberClick?.(member.userId)}
          />
        ))}
      </ListSection>
    </div>
  );
};

export default HouseTodosTab;
