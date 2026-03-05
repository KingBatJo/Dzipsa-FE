import { AlertTriangle, House, User2Icon } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

type DashboardSectionProps = {
  missedCount: number;
};

// 집 상태 카드
const HouseStatusCard = () => {
  return (
    <Card className="border-none bg-[#EEEEEE] p-4">
      <h2 className="text-2xl font-semibold">더럽집</h2>

      <p className="mt-4 text-xs break-keep">
        으악 누군가가 할 일을 안해서 제 집이 더러워졌어요!
      </p>

      {/* 집 상태 그래픽 영역 - 임시 */}
      <div className="relative mt-6 flex justify-center">
        <User2Icon className="absolute bottom-1 left-[15%] h-14 w-14" />
        <House className="h-25 w-25 text-[#6C6C6C]" />
      </div>

      <div className="flex justify-center">
        <Badge className="mt-2 rounded-full px-8 text-center text-xs font-medium">
          행복한 우리집
        </Badge>
      </div>
    </Card>
  );
};

// 놓친 할 일 카드
const MissedTodoCard = ({ count }: { count: number }) => {
  return (
    <Card className="border-none bg-[#EEEEEE] p-4">
      <p className="text-base font-semibold">놓친 할 일</p>

      <p className="mt-2 text-2xl font-semibold">{count}건</p>
    </Card>
  );
};

// 최근 경고 규칙 카드
const WarningRulesCard = () => {
  return (
    <Card className="flex flex-col justify-between border-none bg-[#EEEEEE] p-4">
      <div>
        <p className="text-base font-semibold">최근 경고 규칙</p>
        <p className="mt-2 text-2xl font-semibold">3건</p>
      </div>

      <div className="flex justify-end">
        <AlertTriangle className="h-8 w-8 text-yellow-400" />
      </div>
    </Card>
  );
};

const DashboardSection = ({ missedCount }: DashboardSectionProps) => {
  return (
    <section className="grid grid-cols-[1.4fr_1fr] gap-3">
      <HouseStatusCard />

      <div className="grid grid-rows-2 gap-3">
        <MissedTodoCard count={missedCount} />
        <WarningRulesCard />
      </div>
    </section>
  );
};

export default DashboardSection;
