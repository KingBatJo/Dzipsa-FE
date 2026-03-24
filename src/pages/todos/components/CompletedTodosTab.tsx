import { Card } from '@/components/ui/card';
import EmptyState from '@/components/common/EmptyState';
import ListSection from '@/components/common/ListSection';
import RoundedBadge from '@/components/common/RoundedBadge';
import type { TodoInstanceId } from '@/api/todo/todo.types';
import UserAvatar from '@/components/common/UserAvatar';
import { cn } from '@/lib/utils';
import dzipsaDefault from '@/assets/dzipsa/dzipsa-default.svg';
import { formatStatusDateLabel } from '@/utils/date';
import { getProfileOptionById } from '@/api/room/room.utils';
import { useInfiniteCompletedTodosQuery } from '@/api/todo/todo.query';
import { useInfiniteScrollObserver } from '@/hooks/useInfiniteScrollObserver';

type CompletedTodosTabProps = {
  onTodoClick?: (instanceId: TodoInstanceId) => void;
};

type CompletedTodoFeedCardProps = {
  userName: string;
  todoTitle: string;
  completedDate: string;
  proofImageUrl?: string | null;
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
  const { data, isPending, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteCompletedTodosQuery();
  const completedTodos = data?.pages.flatMap((page) => page.content) ?? [];

  const loadMoreRef = useInfiniteScrollObserver<HTMLDivElement>({
    hasNextPage,
    isFetching: isFetchingNextPage || isPending,
    onLoadMore: fetchNextPage,
    rootMargin: '0px 0px 40px 0px',
    threshold: 0,
  });

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
            const statusLabel = todo.delayDays > 0 ? '지연 완료' : '완료';
            const assigneeProfile = getProfileOptionById(todo.profileImageUrl);

            return (
              <CompletedTodoFeedItem
                key={todo.instanceId}
                onClick={() => onTodoClick?.(todo.instanceId)}
                userName={todo.assigneeNickname}
                profileImage={assigneeProfile.imageUrl}
                todoTitle={todo.title}
                completedDate={formatStatusDateLabel(todo.completedAt)}
                statusLabel={statusLabel}
                proofImageUrl={todo.imageUrl}
              />
            );
          })}

          {completedTodos.length > 0 && (
            <div
              ref={loadMoreRef}
              className="flex h-12 items-center justify-center"
            >
              {isFetchingNextPage ? (
                <div className="py-3 text-center text-sm text-zinc-500">
                  집사가 더 가져오고 있어요...
                </div>
              ) : hasNextPage ? null : (
                <div className="py-3 text-center text-sm text-zinc-500">
                  집사가 다 찾아왔어요!
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </ListSection>
  );
};

export default CompletedTodosTab;
