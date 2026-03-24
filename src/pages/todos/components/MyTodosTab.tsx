import {
  useInfiniteMyMissedTodosQuery,
  useInfiniteMyTodayTodosQuery,
  useInfiniteMyUpcomingTodosQuery,
} from '@/api/todo/todo.query';

import AppButton from '@/components/common/AppButton';
import { Button } from '@/components/ui/button';
import EmptyState from '@/components/common/EmptyState';
import ListItemCard from '@/components/common/ListItemCard';
import ListSection from '@/components/common/ListSection';
import type { TodoInstanceId } from '@/api/todo/todo.types';
import { cn } from '@/lib/utils';
import dzipsaCharacter from '@/assets/dzipsa.svg';
import { formatDueDateLabel } from '@/utils/date';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

type MyTodosTabProps = {
  onTodoClick?: (instanceId: TodoInstanceId) => void;
};

type TodoCompleteButtonProps = {
  isDelayed?: boolean;
  onClick?: () => void;
};

type SectionKey = 'missed' | 'today' | 'upcoming';

const SECTION_PAGE_SIZE = 10;

const TODO_COMPLETE_BUTTON_COLORS = {
  normal: {
    base: '#E4E4E7CC',
    hover: '#8F8F8FCC',
    active: '#565656CC',
  },
  delayed: {
    base: '#A68F8FCC',
    hover: '#8F8F8FCC',
    active: '#565656CC',
  },
} as const;

const TodoCompleteButton = ({
  isDelayed = false,
  onClick,
}: TodoCompleteButtonProps) => {
  const colors = isDelayed
    ? TODO_COMPLETE_BUTTON_COLORS.delayed
    : TODO_COMPLETE_BUTTON_COLORS.normal;

  return (
    <button
      type="button"
      aria-label="할일 완료"
      onClick={onClick}
      className="group flex h-6 w-6 items-center justify-center"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M12 3C19.2 3 21 4.8 21 12C21 19.2 19.2 21 12 21C4.8 21 3 19.2 3 12C3 4.8 4.8 3 12 3Z"
          className={cn(
            'transition-colors duration-150',
            `fill-[${colors.base}]`,
            `group-hover:fill-[${colors.hover}]`,
            `group-active:fill-[${colors.active}]`
          )}
        />
      </svg>
    </button>
  );
};

type SectionActionButtonsProps = {
  hasNextPage?: boolean;
  isFetchingNextPage: boolean;
  onLoadMore: () => void;
  isCollapsed: boolean;
  canToggleCollapse: boolean;
  onToggleCollapse: () => void;
};

const SectionActionButtons = ({
  hasNextPage,
  isFetchingNextPage,
  onLoadMore,
  isCollapsed,
  canToggleCollapse,
  onToggleCollapse,
}: SectionActionButtonsProps) => {
  const showLoadMore =
    isCollapsed || Boolean(hasNextPage) || isFetchingNextPage;
  const showCollapse = canToggleCollapse && !isCollapsed;

  if (!showLoadMore && !showCollapse) return null;

  return (
    <div className="mt-1 flex items-center justify-end gap-2">
      {showLoadMore && (
        <AppButton
          className="h-10 rounded-[10px] border border-zinc-200 bg-white px-4 hover:border-zinc-300 hover:bg-zinc-200 active:border-zinc-400 active:bg-zinc-300"
          onClick={onLoadMore}
          disabled={isFetchingNextPage}
        >
          {isFetchingNextPage ? '불러오는 중...' : '더보기'}
        </AppButton>
      )}

      {showCollapse && (
        <AppButton
          className="h-10 rounded-[10px] border border-zinc-200 bg-white px-4 hover:border-zinc-300 hover:bg-zinc-200 active:border-zinc-400 active:bg-zinc-300"
          onClick={onToggleCollapse}
        >
          접기
        </AppButton>
      )}
    </div>
  );
};

const MyTodosTab = ({ onTodoClick }: MyTodosTabProps) => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState<Record<SectionKey, boolean>>({
    missed: false,
    today: false,
    upcoming: false,
  });

  const {
    data: missedData,
    isPending: isMissedPending,
    fetchNextPage: fetchNextMissed,
    hasNextPage: hasNextMissed,
    isFetchingNextPage: isFetchingNextMissed,
  } = useInfiniteMyMissedTodosQuery();

  const {
    data: todayData,
    isPending: isTodayPending,
    fetchNextPage: fetchNextToday,
    hasNextPage: hasNextToday,
    isFetchingNextPage: isFetchingNextToday,
  } = useInfiniteMyTodayTodosQuery();

  const {
    data: upcomingData,
    isPending: isUpcomingPending,
    fetchNextPage: fetchNextUpcoming,
    hasNextPage: hasNextUpcoming,
    isFetchingNextPage: isFetchingNextUpcoming,
  } = useInfiniteMyUpcomingTodosQuery();

  const missedTodos = missedData?.pages.flatMap((page) => page.content) ?? [];
  const todayTodos = todayData?.pages.flatMap((page) => page.content) ?? [];
  const upcomingTodos =
    upcomingData?.pages.flatMap((page) => page.content) ?? [];

  const visibleTodayTodos = todayTodos.filter(
    (todo) => todo.status !== 'COMPLETED'
  );

  const displayedMissedTodos = collapsed.missed
    ? missedTodos.slice(0, SECTION_PAGE_SIZE)
    : missedTodos;
  const displayedTodayTodos = collapsed.today
    ? visibleTodayTodos.slice(0, SECTION_PAGE_SIZE)
    : visibleTodayTodos;
  const displayedUpcomingTodos = collapsed.upcoming
    ? upcomingTodos.slice(0, SECTION_PAGE_SIZE)
    : upcomingTodos;

  const isPending = isMissedPending || isTodayPending || isUpcomingPending;

  if (isPending) {
    return (
      <div className="flex min-h-[240px] animate-pulse items-center justify-center text-sm font-medium text-zinc-400">
        할 일을 불러오고 있어요
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-7">
      {missedTodos.length > 0 && (
        <ListSection title="놓친 할 일이 있어요 !">
          {displayedMissedTodos.map((todo) => (
            <ListItemCard
              key={todo.instanceId}
              title={todo.title}
              subtitle={formatDueDateLabel(todo.targetDate)}
              right={<TodoCompleteButton isDelayed={todo.delayDays > 0} />}
              onClick={() => onTodoClick?.(todo.instanceId)}
              isDelayed={todo.delayDays > 0}
              badge={todo.delayDays > 0 ? `D+${todo.delayDays}` : undefined}
            />
          ))}

          <SectionActionButtons
            hasNextPage={hasNextMissed}
            isFetchingNextPage={isFetchingNextMissed}
            onLoadMore={() => {
              if (collapsed.missed) {
                setCollapsed((prev) => ({ ...prev, missed: false }));
                return;
              }
              void fetchNextMissed();
            }}
            isCollapsed={collapsed.missed}
            canToggleCollapse={missedTodos.length > SECTION_PAGE_SIZE}
            onToggleCollapse={() =>
              setCollapsed((prev) => ({ ...prev, missed: !prev.missed }))
            }
          />
        </ListSection>
      )}

      <ListSection title="Today">
        {visibleTodayTodos.length === 0 ? (
          <EmptyState>
            <img
              src={dzipsaCharacter}
              alt="디집사 캐릭터"
              className="h-[74px] w-20"
            />

            <div className="text-center text-sm font-semibold text-zinc-500">
              <p>오늘 할 일은 무엇인가요?</p>
              <p>첫 번째 할 일을 추가해 보세요!</p>
            </div>

            <Button
              onClick={() => navigate('/todos/new')}
              className="h-12 w-full rounded-[10px] bg-zinc-800"
            >
              첫 할 일 만들기
            </Button>
          </EmptyState>
        ) : (
          <>
            {displayedTodayTodos.map((todo) => (
              <ListItemCard
                key={todo.instanceId}
                title={todo.title}
                subtitle={formatDueDateLabel(todo.targetDate)}
                right={<TodoCompleteButton />}
                onClick={() => onTodoClick?.(todo.instanceId)}
              />
            ))}

            <SectionActionButtons
              hasNextPage={hasNextToday}
              isFetchingNextPage={isFetchingNextToday}
              onLoadMore={() => {
                if (collapsed.today) {
                  setCollapsed((prev) => ({ ...prev, today: false }));
                  return;
                }
                void fetchNextToday();
              }}
              isCollapsed={collapsed.today}
              canToggleCollapse={visibleTodayTodos.length > SECTION_PAGE_SIZE}
              onToggleCollapse={() =>
                setCollapsed((prev) => ({ ...prev, today: !prev.today }))
              }
            />
          </>
        )}
      </ListSection>

      {upcomingTodos.length > 0 && (
        <ListSection title="예정된 할 일">
          {displayedUpcomingTodos.map((todo) => (
            <ListItemCard
              key={todo.instanceId}
              title={todo.title}
              subtitle={formatDueDateLabel(todo.targetDate)}
              right={<TodoCompleteButton />}
              onClick={() => onTodoClick?.(todo.instanceId)}
            />
          ))}

          <SectionActionButtons
            hasNextPage={hasNextUpcoming}
            isFetchingNextPage={isFetchingNextUpcoming}
            onLoadMore={() => {
              if (collapsed.upcoming) {
                setCollapsed((prev) => ({ ...prev, upcoming: false }));
                return;
              }
              void fetchNextUpcoming();
            }}
            isCollapsed={collapsed.upcoming}
            canToggleCollapse={upcomingTodos.length > SECTION_PAGE_SIZE}
            onToggleCollapse={() =>
              setCollapsed((prev) => ({ ...prev, upcoming: !prev.upcoming }))
            }
          />
        </ListSection>
      )}
    </div>
  );
};

export default MyTodosTab;
