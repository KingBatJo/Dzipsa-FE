import { Card } from '@/components/ui/card';
import EmptyState from '@/components/common/EmptyState';
import ListSection from '@/components/common/ListSection';
import RoundedBadge from '@/components/common/RoundedBadge';
import type { TodoInstanceId } from '@/api/todo/todo.types';
import UserAvatar from '@/components/common/UserAvatar';
import { cn } from '@/lib/utils';
import dzipsaDefault from '@/assets/dzipsa/dzipsa-default.svg';
import { formatKoreanDateLabel } from '@/utils/date';
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
  statusLabel: string;
  isDelayed: boolean;
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
  isDelayed,
  onClick,
}: CompletedTodoFeedCardProps) => {
  const statusBadge = (
    <RoundedBadge
      className={cn(
        'w-fit shrink-0 font-bold whitespace-nowrap',
        isDelayed ? 'bg-red-400 text-red-50' : 'bg-neutral-400 text-neutral-200'
      )}
    >
      {statusLabel}
    </RoundedBadge>
  );

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
      <div className="flex items-start justify-between">
        <div className="min-w-0 flex-1">
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-2">
              <p className="text-primary line-clamp-2 text-base leading-[19px] font-semibold break-keep">
                {todoTitle}
              </p>

              <div className="flex gap-1">
                <div className="w-0.5 bg-zinc-400" />
                <p className="text-xs font-medium text-zinc-400">
                  {completedDate}
                </p>
              </div>
            </div>

            {proofImageUrl && statusBadge}
          </div>
        </div>

        <div className="ml-3 shrink-0">
          {proofImageUrl ? (
            <img
              src={proofImageUrl}
              alt="인증 사진"
              className="h-25 w-25 rounded-xl object-cover"
            />
          ) : (
            statusBadge
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
          {props.userName}님이 할 일을 완료하셨어요 !
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
      {isPending && completedTodos.length === 0 ? (
        <div className="flex min-h-[240px] animate-pulse items-center justify-center text-sm font-medium text-zinc-400">
          할 일을 불러오고 있어요
        </div>
      ) : completedTodos.length === 0 ? (
        <EmptyState
          variant="minimal"
          image={
            <img
              src={dzipsaDefault}
              alt="집사 캐릭터"
              className="h-26 w-26 object-contain"
            />
          }
          title="완료된 할 일이 없어요!"
          description="하나만 해내도 정리 기록이 쌓이기 시작해요."
        />
      ) : (
        <div className="flex flex-col">
          {completedTodos.map((todo) => {
            const isDelayed = todo.delayDays > 0;
            const statusLabel = isDelayed ? '기한 후 완료' : '기한 내 완료';
            const assigneeProfile = getProfileOptionById(todo.profileImageUrl);

            return (
              <CompletedTodoFeedItem
                key={todo.instanceId}
                onClick={() => onTodoClick?.(todo.instanceId)}
                userName={todo.assigneeNickname}
                profileImage={assigneeProfile.imageUrl}
                todoTitle={todo.title}
                completedDate={formatKoreanDateLabel(todo.completedAt)}
                statusLabel={statusLabel}
                isDelayed={isDelayed}
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
              ) : null}
            </div>
          )}
        </div>
      )}
    </ListSection>
  );
};

export default CompletedTodosTab;
