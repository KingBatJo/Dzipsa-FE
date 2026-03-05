import { Card } from '@/components/ui/card';
import ListItemCard from '@/components/common/ListItemCard';
import ListSection from '@/components/common/ListSection';
import { PROFILE_IMAGE } from '@/mocks/mockData';
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
  return (
    <div className="space-y-8">
      <ListSection title="오늘 할 일">
        <HouseTodosSummary
          total={6}
          completed={3}
          myRemaining={1}
          userName="짱구"
          message="오늘 하루 정말 수고하셨어요!"
        />

        <ListItemCard
          title="주방 가전용품 청소"
          subtitle="오늘 오전 9:00"
          right={<UserAvatar src={PROFILE_IMAGE} />}
        />
      </ListSection>

      <ListSection title="우리 집 모든 할 일">
        <ListItemCard
          title="주방 가전용품 청소"
          subtitle="오늘 오전 9:00"
          right={<UserAvatar src={PROFILE_IMAGE} />}
        />
      </ListSection>
    </div>
  );
};

export default HouseTodosTab;
