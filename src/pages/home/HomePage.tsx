import { MOCK_MY_ID, MOCK_TODAY, mockTodoList } from '@/mocks/mockData';
import { addLocalToTodos, getTodoSections } from '@/utils/todos';

import DashboardSection from '@/pages/home/components/DashboardSection';
import EmptyState from '@/components/common/EmptyState';
import MembersSection from '@/pages/home/components/MembersSection';
import MottoSection from '@/pages/home/components/MottoSection';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { formatDueDateLabel } from '@/utils/date';
import { getApiErrorMessage } from '@/api/error';
import { toast } from 'sonner';
import { useEffect } from 'react';
import { useMeQuery } from '@/api/auth/auth.query';
import { useMyRoomQuery } from '@/api/room/room.query';

const HomePage = () => {
  const { data: room, isError, error, isPending } = useMyRoomQuery();
  const { data: me } = useMeQuery();

  const isInitialLoading = !room && isPending;

  const myId = MOCK_MY_ID;
  const today = MOCK_TODAY;

  const todos = addLocalToTodos(mockTodoList);
  const myTodos = todos.filter((t) => t.assigneeId === myId);

  const { todayTodos } = getTodoSections(myTodos, today);
  const visibleTodayTodos = todayTodos.filter((t) => !t.completed);

  useEffect(() => {
    if (!isError) return;

    const message = getApiErrorMessage(error);

    console.error('우리 방 조회 실패:', message, error);
    toast(message);
  }, [isError, error]);

  return (
    <div className="">
      <div className="bg-zinc-100 pb-2">
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

      <section className="relative rounded-t-[20px] bg-white px-4 pt-5 pb-5">
        <div className="flex flex-col gap-3">
          <h2 className="text-base font-semibold text-zinc-700">
            {me?.nickname ?? '우리집'}님의 오늘 할 일
          </h2>

          {visibleTodayTodos.length === 0 ? (
            <EmptyState>오늘 할 일이 없어요.</EmptyState>
          ) : isInitialLoading ? (
            <div className="scrollbar-hide flex gap-2 overflow-x-auto pb-1">
              <Skeleton className="h-[135px] w-[134px] shrink-0 rounded-lg bg-zinc-100" />
              <Skeleton className="h-[135px] w-[134px] shrink-0 rounded-lg bg-zinc-100" />
              <Skeleton className="h-[135px] w-[134px] shrink-0 rounded-lg bg-zinc-100" />
            </div>
          ) : (
            <div className="scrollbar-hide flex gap-2 overflow-x-auto">
              {visibleTodayTodos.map((todo) => (
                <button
                  key={todo.id}
                  className={cn(
                    'flex shrink-0 flex-col justify-between gap-8 rounded-[8px] border border-zinc-100 bg-zinc-50 p-3',
                    'hover:border-zinc-300 hover:bg-zinc-200 active:border-zinc-400 active:bg-zinc-300'
                  )}
                >
                  <div className="flex flex-col gap-2">
                    <p className="text-primary text-base leading-[19px] font-semibold">
                      {todo.title}
                    </p>
                    <div className="flex items-center gap-1">
                      <div className="h-3.5 w-0.5 bg-zinc-400" />
                      <p className="text-xs font-medium text-zinc-400">
                        {formatDueDateLabel(todo.dueAt)}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="h-[34px] rounded-[12px] bg-zinc-800 px-4 text-sm font-medium text-zinc-100"
                  >
                    완료 체크
                  </button>
                </button>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
