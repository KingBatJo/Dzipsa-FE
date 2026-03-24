import type { MyTodoListItem, TodoInstanceId } from '@/api/todo/todo.types';
import {
  useCompleteTodoMutation,
  useInfiniteMyMissedTodosQuery,
  useInfiniteMyTodayTodosQuery,
  useInfiniteMyUpcomingTodosQuery,
} from '@/api/todo/todo.query';

import { Button } from '@/components/ui/button';
import EmptyState from '@/components/common/EmptyState';
import ListItemCard from '@/components/common/ListItemCard';
import ListSection from '@/components/common/ListSection';
import SectionActionButtons from '@/pages/todos/components/SectionActionButtons';
import { TODO_STATUS } from '@/constants/todos';
import TodoCompleteButton from '@/pages/todos/components/TodoCompleteButton';
import TodoCompleteSheet from '@/pages/todos/components/TodoCompleteSheet';
import TodoSubtitle from '@/pages/todos/components/TodoSubtitle';
import dzipsaCharacter from '@/assets/dzipsa.svg';
import { getTodoSubtitleInfo } from '@/api/todo/todo.utils';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

type MyTodosTabProps = {
  onTodoClick?: (instanceId: TodoInstanceId) => void;
};

type SectionKey = 'missed' | 'today' | 'upcoming';

const SECTION_PAGE_SIZE = 5;

const renderTodoSubtitle = (todo: MyTodoListItem) => {
  const { dueDateLabel, repeatLabel } = getTodoSubtitleInfo(todo);
  return <TodoSubtitle dueDateLabel={dueDateLabel} repeatLabel={repeatLabel} />;
};

const MyTodosTab = ({ onTodoClick }: MyTodosTabProps) => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState<Record<SectionKey, boolean>>({
    missed: false,
    today: false,
    upcoming: false,
  });
  const [completeSheetOpen, setCompleteSheetOpen] = useState(false);
  const [completeTargetInstanceId, setCompleteTargetInstanceId] =
    useState<TodoInstanceId | null>(null);

  const { mutate: completeTodo, isPending: isCompleting } =
    useCompleteTodoMutation();

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
    (todo) => todo.status !== TODO_STATUS.COMPLETED
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

  const handleOpenCompleteSheet = (instanceId: TodoInstanceId) => {
    setCompleteTargetInstanceId(instanceId);
    setCompleteSheetOpen(true);
  };

  const handleConfirmComplete = (proofImageFile?: File) => {
    if (completeTargetInstanceId == null) return;

    completeTodo(
      { instanceId: completeTargetInstanceId, image: proofImageFile ?? null },
      {
        onSuccess: () => {
          setCompleteSheetOpen(false);
          setCompleteTargetInstanceId(null);
        },
      }
    );
  };

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
              subtitle={renderTodoSubtitle(todo)}
              right={
                <TodoCompleteButton
                  isDelayed={todo.delayDays > 0}
                  onClick={() => handleOpenCompleteSheet(todo.instanceId)}
                />
              }
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
                subtitle={renderTodoSubtitle(todo)}
                right={
                  <TodoCompleteButton
                    onClick={() => handleOpenCompleteSheet(todo.instanceId)}
                  />
                }
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
              subtitle={renderTodoSubtitle(todo)}
              right={
                <TodoCompleteButton
                  onClick={() => handleOpenCompleteSheet(todo.instanceId)}
                />
              }
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

      <TodoCompleteSheet
        open={completeSheetOpen}
        onOpenChange={(open) => {
          setCompleteSheetOpen(open);
          if (!open) setCompleteTargetInstanceId(null);
        }}
        onConfirmComplete={handleConfirmComplete}
        isSubmitting={isCompleting}
      />
    </div>
  );
};

export default MyTodosTab;
