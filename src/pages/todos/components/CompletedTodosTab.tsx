import { Card } from '@/components/ui/card';
import ListSection from '@/components/common/ListSection';
import RoundedBadge from '@/components/common/RoundedBadge';
import UserAvatar from '@/components/common/UserAvatar';

type CompletedTodoFeedCardProps = {
  userName: string;
  todoTitle: string;
  dueDate: string;
  proofImageUrl?: string;
  isDelayed?: boolean;
};

type CompletedTodoFeedItemProps = CompletedTodoFeedCardProps;

const CompletedTodoFeedCard = ({
  userName,
  todoTitle,
  dueDate,
  proofImageUrl,
  isDelayed = false,
}: CompletedTodoFeedCardProps) => {
  return (
    <Card className="flex flex-1 flex-col gap-3 border-slate-100 p-4">
      <p className="text-sm font-medium">
        {userName}님이 할 일을 완료하였습니다.
      </p>

      {proofImageUrl && (
        // 임시 (추후 img로 교체)
        <div className="bg-accent h-[150px] w-full rounded-xl"></div>
      )}

      <div className="flex gap-2">
        <RoundedBadge className="bg-slate-100 text-slate-600">
          {todoTitle}
        </RoundedBadge>

        {isDelayed && (
          <RoundedBadge className="bg-[#FFEDD5] text-[#FF602C]">
            지연 완료
          </RoundedBadge>
        )}
      </div>

      {/* 마감일 */}
      <p className="text-sm font-normal text-slate-400">{dueDate}</p>
    </Card>
  );
};

const CompletedTodoFeedItem = (props: CompletedTodoFeedItemProps) => {
  return (
    <div className="flex gap-4">
      <div className="pt-1">
        <UserAvatar />
      </div>

      <CompletedTodoFeedCard {...props} />
    </div>
  );
};

const CompletedTodosTab = () => {
  return (
    <ListSection title="Today">
      <div className="flex flex-col gap-8 pt-3">
        <CompletedTodoFeedItem
          userName="짱구"
          todoTitle="빨래하기"
          dueDate="2026.03.04"
          proofImageUrl="temp"
        />
        <CompletedTodoFeedItem
          userName="짱아"
          todoTitle="세탁기 필터 청소"
          dueDate="2026.03.03"
          isDelayed
        />
        <CompletedTodoFeedItem
          userName="철수"
          todoTitle="현관 바닥 청소"
          dueDate="2026.03.03"
        />
        <CompletedTodoFeedItem
          userName="맹구"
          todoTitle="전등 교체"
          dueDate="2026.03.03"
          proofImageUrl="temp"
          isDelayed
        />
      </div>
    </ListSection>
  );
};

export default CompletedTodosTab;
