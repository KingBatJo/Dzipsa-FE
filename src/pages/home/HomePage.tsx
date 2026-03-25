import {
  MOCK_MY_ID,
  MOCK_TODAY,
  PROFILE_IMAGE,
  mockTodoList,
} from '@/mocks/mockData';
import { addLocalToTodos, getTodoSections } from '@/utils/todos';

import DashboardSection from '@/pages/home/components/DashboardSection';
import EmptyState from '@/components/common/EmptyState';
import ListItemCard from '@/components/common/ListItemCard';
import ListSection from '@/components/common/ListSection';
import MembersSection from '@/pages/home/components/MembersSection';
import MottoSection from '@/pages/home/components/MottoSection';
import UserAvatar from '@/components/common/UserAvatar';
import { formatDueDateLabel } from '@/utils/date';
import { getApiErrorMessage } from '@/api/error';
import { toast } from 'sonner';
import { useEffect } from 'react';
import { useMyRoomQuery } from '@/api/room/room.query';

const HomePage = () => {
  const { data: room, isError, error, isPending } = useMyRoomQuery();

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
    <div className="pb-[15px]">
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

      <ListSection title="오늘 할 일" className="px-4 pt-5 pb-5">
        {visibleTodayTodos.length === 0 ? (
          <EmptyState>오늘 할 일이 없어요.</EmptyState>
        ) : (
          visibleTodayTodos.map((todo) => (
            <ListItemCard
              key={todo.id}
              title={todo.title}
              subtitle={formatDueDateLabel(todo.dueAt)}
              right={<UserAvatar src={PROFILE_IMAGE} />}
              onClick={() => {}}
            />
          ))
        )}
      </ListSection>
    </div>
  );
};

export default HomePage;
