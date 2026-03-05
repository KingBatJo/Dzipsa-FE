import { Card } from '@/components/ui/card';
import ListItemCard from '@/components/common/ListItemCard';
import ListSection from '@/components/common/ListSection';
import { PROFILE_IMAGE } from '@/mocks/mockData';
import { User2 } from 'lucide-react';
import UserAvatar from '@/components/common/UserAvatar';

const HouseTodosTab = () => {
  return (
    <div className="space-y-8">
      <ListSection title="오늘 할 일">
        <HouseTodosSummary
          total={6}
          completed={3}
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

type HouseTodosSummaryProps = {
  total: number;
  completed: number;
  message: string;
};

const HouseTodosSummary = ({
  total,
  completed,
  message,
}: HouseTodosSummaryProps) => {
  const remaining = Math.max(total - completed, 0); // 남은 할 일

  return (
    <Card className="relative mb-4 rounded-md border-none bg-[#BDBDBD] p-4">
      <div className="text-sm font-medium">
        <p>
          오늘 할 일 {total}개 중 {completed}개가 완료되었어요!
        </p>
        <p>{message}</p>
        <p>00님은 할 일 {remaining}개가 남아있어요</p>
      </div>

      {/* 임시 */}
      <User2 className="absolute -right-3 -bottom-3 h-38 w-38 text-[#DEDEDE]" />
    </Card>
  );
};
