import { useEffect, useState } from 'react';

import AppButton from '@/components/common/AppButton';
import DashboardSection from '@/pages/home/components/DashboardSection';
import EmptyState from '@/components/common/EmptyState';
import MembersSection from '@/pages/home/components/MembersSection';
import MottoSection from '@/pages/home/components/MottoSection';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { formatDueDateLabel } from '@/utils/date';
import { getApiErrorMessage } from '@/api/error';
import { toast } from 'sonner';
import { useInfiniteMyTodayTodosQuery } from '@/api/todo/todo.query';
import { useInfiniteScrollObserver } from '@/hooks/useInfiniteScrollObserver';
import { useMeQuery } from '@/api/auth/auth.query';
import { useMyRoomQuery } from '@/api/room/room.query';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  const { data: room, isError, error, isPending } = useMyRoomQuery();
  const { data: me } = useMeQuery();
  const todayTodosQuery = useInfiniteMyTodayTodosQuery();
  const [todayListRoot, setTodayListRoot] = useState<HTMLDivElement | null>(
    null
  );

  const isInitialLoading = !room && isPending;

  const visibleTodayTodos =
    todayTodosQuery.data?.pages.flatMap((page) => page.content) ?? [];

  const loadMoreRef = useInfiniteScrollObserver<HTMLDivElement>({
    hasNextPage: todayTodosQuery.hasNextPage,
    isFetching: todayTodosQuery.isFetchingNextPage || todayTodosQuery.isPending,
    onLoadMore: todayTodosQuery.fetchNextPage,
    root: todayListRoot,
    rootMargin: '0px 32px 0px 0px',
    threshold: 0,
    enabled: !todayTodosQuery.isError,
  });

  useEffect(() => {
    if (!isError) return;

    const message = getApiErrorMessage(error);

    console.error('우리 방 조회 실패:', message, error);
    toast(message);
  }, [isError, error]);

  return (
    <div>
      <div>
        <MottoSection
          motto={room?.motto ?? '우리 집 가훈을 다같이 정해볼까요?'}
          isLoading={isInitialLoading}
        />
        <MembersSection
          members={room?.members ?? []}
          isLoading={isInitialLoading}
        />
        <DashboardSection
          score={room?.score ?? 3}
          delayTaskCount={room?.delayTaskCount ?? 0}
          ruleWarningCount={room?.ruleWarningCount ?? 0}
          isLoading={isInitialLoading}
        />
      </div>

      <section className="relative rounded-t-[20px] bg-gradient-to-b from-white via-white via-90% to-transparent px-4 pt-5 pb-5">
        <div className="flex flex-col gap-3">
          <h2 className="text-base font-semibold text-zinc-700">
            {me?.nickname ?? '우리집'}님의 오늘 할 일
          </h2>

          {todayTodosQuery.isPending ? (
            <div className="scrollbar-hide flex gap-2 overflow-x-auto pb-1">
              <Skeleton className="h-[131px] w-[145px] shrink-0 rounded-lg bg-zinc-100" />
              <Skeleton className="h-[131px] w-[145px] shrink-0 rounded-lg bg-zinc-100" />
              <Skeleton className="h-[131px] w-[145px] shrink-0 rounded-lg bg-zinc-100" />
              <Skeleton className="h-[131px] w-[145px] shrink-0 rounded-lg bg-zinc-100" />
            </div>
          ) : visibleTodayTodos.length === 0 ? (
            <EmptyState className="bg-zinc-100">
              <p className="text-center text-sm font-semibold text-zinc-600">
                {me?.nickname}님, 오늘 할 일이 없네요!
                <br />
                여유로운 하루를 보내보세요
              </p>
              <AppButton
                onClick={() => navigate('/todos/house')}
                className="bg-zinc-800 text-white"
              >
                우리집 할 일 보러가기
              </AppButton>
            </EmptyState>
          ) : (
            <div className="relative">
              <div
                ref={setTodayListRoot}
                className="scrollbar-hide flex snap-x snap-mandatory gap-2 overflow-x-auto pb-1"
              >
                {visibleTodayTodos.map((todo) => (
                  <article
                    key={todo.instanceId}
                    className={cn(
                      'flex h-fit w-[145px] shrink-0 snap-start flex-col gap-8 rounded-[8px] border border-zinc-100 bg-zinc-50 p-3',
                      'hover:border-zinc-300 hover:bg-zinc-200 active:border-zinc-400 active:bg-zinc-300'
                    )}
                  >
                    <div className="flex w-full min-w-0 flex-col items-stretch gap-2">
                      <p className="text-primary truncate text-base leading-[19px] font-semibold whitespace-nowrap">
                        {todo.title}
                      </p>
                      <div className="flex items-center gap-1">
                        <div className="h-3.5 w-0.5 shrink-0 bg-zinc-400" />
                        <p className="text-xs leading-[14px] font-medium text-zinc-400">
                          {formatDueDateLabel(todo.targetDate)}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      className="h-[34px] rounded-[12px] bg-zinc-800 px-4 text-sm font-medium text-zinc-100"
                    >
                      완료 체크
                    </button>
                  </article>
                ))}

                {todayTodosQuery.isFetchingNextPage && (
                  <Skeleton className="h-[150px] w-[160px] shrink-0 snap-start rounded-[8px] bg-zinc-100" />
                )}

                {todayTodosQuery.hasNextPage && (
                  <div ref={loadMoreRef} className="h-[150px] w-4 shrink-0" />
                )}
              </div>

              <div
                aria-hidden
                className="pointer-events-none absolute top-0 right-0 h-full w-10 bg-gradient-to-l from-white to-[rgba(246,246,247,0)]"
              />
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
