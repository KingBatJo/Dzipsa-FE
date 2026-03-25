import { useEffect, useState } from 'react';
import {
  useInfiniteHouseAllTodosQuery,
  useInfiniteHouseDelayedTodosQuery,
  useInfiniteHouseMemberTodosQuery,
  useInfiniteHouseTodayTodosQuery,
} from '@/api/todo/todo.query';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import EmptyState from '@/components/common/EmptyState';
import type { HouseMemberRouteState } from './components/HouseTodosTab';
import ListItemCard from '@/components/common/ListItemCard';
import { MOBILE_MAX_WIDTH } from '@/constants/layout';
import type { MyTodoListItem } from '@/api/todo/todo.types';
import TodoDetailSheet from '@/pages/todos/components/TodoDetailSheet';
import TodoSubtitle from '@/pages/todos/components/TodoSubtitle';
import UserAvatar from '@/components/common/UserAvatar';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import dzipsaDefault from '@/assets/dzipsa/dzipsa-default.svg';
import { getProfileOptionById } from '@/api/room/room.utils';
import { getTodoSubtitleInfo } from '@/api/todo/todo.utils';
import { useInfiniteScrollObserver } from '@/hooks/useInfiniteScrollObserver';
import { useMeQuery } from '@/api/auth/auth.query';
import { useRoomMembersQuery } from '@/api/room/room.query';

export type TodoListCategory = 'today' | 'delayed' | 'all';

const renderTodoSubtitle = (todo: MyTodoListItem) => {
  const { dueDateLabel, repeatLabel } = getTodoSubtitleInfo(todo);
  return <TodoSubtitle dueDateLabel={dueDateLabel} repeatLabel={repeatLabel} />;
};

const TodoListPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { type, memberId } = useParams();
  const { data: me } = useMeQuery();

  const [selectedInstanceId, setSelectedInstanceId] = useState<number | null>(
    null
  );
  const [detailOpen, setDetailOpen] = useState(false);

  const memberIdNum = Number(memberId);
  const isMemberView = Number.isFinite(memberIdNum) && memberIdNum > 0;
  const memberFromState = (
    location.state as { member?: HouseMemberRouteState } | undefined
  )?.member;
  const shouldFetchMembers = isMemberView && !memberFromState?.nickname;
  const { data: roomMembers = [] } = useRoomMembersQuery(undefined, {
    enabled: shouldFetchMembers,
  });

  const viewType: TodoListCategory =
    type === 'today' || type === 'delayed' ? type : 'all';

  const todayQuery = useInfiniteHouseTodayTodosQuery(
    !isMemberView && viewType === 'today'
  );
  const delayedQuery = useInfiniteHouseDelayedTodosQuery(
    !isMemberView && viewType === 'delayed'
  );
  const allQuery = useInfiniteHouseAllTodosQuery(
    !isMemberView && viewType === 'all'
  );
  const memberQuery = useInfiniteHouseMemberTodosQuery(
    memberIdNum,
    isMemberView
  );

  const activeQuery = isMemberView
    ? memberQuery
    : viewType === 'today'
      ? todayQuery
      : viewType === 'delayed'
        ? delayedQuery
        : allQuery;

  const filteredTodos =
    activeQuery.data?.pages.flatMap((page) => page.content) ?? [];

  const loadMoreRef = useInfiniteScrollObserver<HTMLDivElement>({
    hasNextPage: activeQuery.hasNextPage,
    isFetching: activeQuery.isFetchingNextPage || activeQuery.isPending,
    onLoadMore: activeQuery.fetchNextPage,
    rootMargin: '0px 0px 40px 0px',
    threshold: 0,
    enabled: !activeQuery.isError,
  });

  const memberName =
    memberFromState?.nickname ??
    roomMembers.find((member) => member.id === memberIdNum)?.nickname ??
    (me?.id === memberIdNum ? me.nickname : undefined) ??
    '구성원';

  const title = isMemberView
    ? `${memberName}님의 할 일`
    : viewType === 'today'
      ? '오늘 할 일'
      : viewType === 'delayed'
        ? '놓친 할 일'
        : '모든 할 일';

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, []);

  const handleDetailOpenChange = (open: boolean) => {
    setDetailOpen(open);
    if (!open) setSelectedInstanceId(null);
  };

  return (
    <div className="min-h-dvh bg-zinc-100">
      <header
        className={cn(
          'fixed top-0 z-10 flex w-full items-center justify-center p-[15px] backdrop-blur-xl',
          MOBILE_MAX_WIDTH
        )}
      >
        <h1 className="text-lg leading-5 font-semibold">{title}</h1>

        <button
          type="button"
          onClick={() => navigate(-1)}
          className="absolute right-4"
          aria-label="닫기"
        >
          <X className="h-6 w-6" />
        </button>
      </header>

      <div className="flex flex-col gap-2 px-[15px] pt-[65px] pb-[15px]">
        {activeQuery.isPending ? (
          <div className="flex min-h-[240px] animate-pulse items-center justify-center text-sm font-medium text-zinc-400">
            할 일을 불러오고 있어요
          </div>
        ) : filteredTodos.length === 0 ? (
          <EmptyState
            variant="minimal"
            image={
              <img
                src={dzipsaDefault}
                alt="디집사 캐릭터"
                className="h-26 w-26 object-contain"
              />
            }
            title="우리집 할 일이 아직 없어요 !"
            description="함께 할 일을 하나 만들어보세요."
          />
        ) : (
          <>
            {filteredTodos.map((todo) => (
              <ListItemCard
                key={todo.instanceId}
                title={todo.title}
                subtitle={renderTodoSubtitle(todo)}
                right={
                  <UserAvatar
                    src={getProfileOptionById(todo.profileImageUrl).imageUrl}
                  />
                }
                onClick={() => {
                  setSelectedInstanceId(todo.instanceId);
                  setDetailOpen(true);
                }}
                isDelayed={todo.delayDays > 0}
                badge={todo.delayDays > 0 ? `D+${todo.delayDays}` : undefined}
              />
            ))}

            <div
              ref={loadMoreRef}
              className="flex h-12 items-center justify-center"
            >
              {activeQuery.isFetchingNextPage ? (
                <div className="py-3 text-center text-sm text-zinc-500">
                  디집사가 더 가져오고 있어요...
                </div>
              ) : null}
            </div>
          </>
        )}
      </div>

      <TodoDetailSheet
        open={detailOpen}
        onOpenChange={handleDetailOpenChange}
        instanceId={selectedInstanceId}
      />
    </div>
  );
};

export default TodoListPage;
