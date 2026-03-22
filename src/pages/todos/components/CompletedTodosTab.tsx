import { MOCK_TODAY, mockMembers, mockTodoList } from '@/mocks/mockData';
import {
  addLocalToTodos,
  getTodoSections,
  getTodoStatusLabel,
} from '@/utils/todos';

import { Card } from '@/components/ui/card';
import EmptyState from '@/components/common/EmptyState';
import ListSection from '@/components/common/ListSection';
import RoundedBadge from '@/components/common/RoundedBadge';
import type { TodoWithLocal } from '@/types/todo';
import UserAvatar from '@/components/common/UserAvatar';
import { cn } from '@/lib/utils';
import dzipsaDefault from '@/assets/dzipsa/dzipsa-default.svg';
import { formatStatusDateLabel } from '@/utils/date';

type CompletedTodosTabProps = {
  onTodoClick?: (todo: TodoWithLocal) => void;
};

type CompletedTodoFeedCardProps = {
  userName: string;
  todoTitle: string;
  completedDate: string;
  proofImageUrl?: string;
  statusLabel: '완료' | '지연 완료';
  onClick?: () => void;
};

type CompletedTodoFeedItemProps = CompletedTodoFeedCardProps & {
  profileImage?: string;
};

const CompletedTodoFeedCard = ({
  todoTitle,
  completedDate,
  proofImageUrl,
  statusLabel,
  onClick,
}: CompletedTodoFeedCardProps) => {
  return (
    <Card
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      className={cn(
        'mb-4.5 flex flex-1 flex-col gap-3 border-zinc-200 shadow-none',
        onClick && 'hover:cursor-pointer',
        proofImageUrl ? 'py-2 pr-2 pl-6' : 'px-6 py-4'
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-2">
            <p className="text-primary text-base leading-[19px] font-semibold">
              {todoTitle}
            </p>

            {/* 완료된 날짜 */}
            <div className="flex gap-1">
              <div className="w-0.5 bg-zinc-400" />
              <p className="text-xs font-medium text-zinc-400">
                {completedDate}
              </p>
            </div>
          </div>

          {statusLabel === '지연 완료' && (
            <RoundedBadge className="w-fit bg-red-400 font-bold text-red-50">
              기한 후 완료
            </RoundedBadge>
          )}
        </div>

        <div>
          {proofImageUrl ? (
            // 임시 (추후 img로 교체)
            <div className="bg-accent h-25 w-25 rounded-xl"></div>
          ) : (
            statusLabel === '완료' && (
              <RoundedBadge className="bg-neutral-400 font-bold text-neutral-200">
                기한 내 완료
              </RoundedBadge>
            )
          )}
        </div>
      </div>
    </Card>
  );
};

const CompletedTodoFeedItem = ({
  profileImage,
  ...props
}: CompletedTodoFeedItemProps) => {
  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-3">
        <UserAvatar src={profileImage} />

        <p className="text-primary text-sm font-semibold">
          {props.userName}님이 할 일을 완료하였어요 !
        </p>
      </div>

      <div className="flex gap-[23px] px-3 py-[5px]">
        <div className="w-[1px] bg-zinc-300" />

        <CompletedTodoFeedCard {...props} />
      </div>
    </div>
  );
};

const CompletedTodosTab = ({ onTodoClick }: CompletedTodosTabProps) => {
  const todosWithLocal = addLocalToTodos(mockTodoList);

  const { completedTodos } = getTodoSections(todosWithLocal, MOCK_TODAY);

  return (
    <ListSection title="TimeLine">
      {completedTodos.length === 0 ? (
        <EmptyState
          variant="minimal"
          image={
            <img
              src={dzipsaDefault}
              alt="집사 캐릭터"
              className="h-26 w-26 object-contain"
            />
          }
          title="완료된 할 일이 없어요 !"
          description="하나만 끝내도 우리집 기록이 쌓이기 시작해요."
        />
      ) : (
        <div className="flex flex-col">
          {completedTodos.map((todo) => {
            const member = mockMembers.find((m) => m.id === todo.assigneeId);
            const statusLabel = getTodoStatusLabel(todo, MOCK_TODAY);
            const completedDateLabel = todo.completedAt
              ? formatStatusDateLabel(todo.completedAt)
              : '';

            if (statusLabel !== '완료' && statusLabel !== '지연 완료') {
              return null;
            }

            return (
              <CompletedTodoFeedItem
                key={todo.id}
                onClick={() => onTodoClick?.(todo)}
                userName={member?.name ?? '알 수 없음'}
                profileImage={member?.profileImage}
                todoTitle={todo.title}
                completedDate={completedDateLabel}
                statusLabel={statusLabel}
                proofImageUrl={todo.proofImageUrl}
              />
            );
          })}
        </div>
      )}
    </ListSection>
  );
};

export default CompletedTodosTab;
