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
  const { data: room, isError, error } = useMyRoomQuery();

  const myId = MOCK_MY_ID;
  const today = MOCK_TODAY;

  const todos = addLocalToTodos(mockTodoList);
  const myTodos = todos.filter((t) => t.assigneeId === myId);

  const { todayTodos, missedTodos } = getTodoSections(myTodos, today);

  const visibleTodayTodos = todayTodos.filter((t) => !t.completed);
  const missedCount = missedTodos.length;

  useEffect(() => {
    if (!isError) return;

    const message = getApiErrorMessage(error);

    console.error('우리 방 조회 실패:', message, error);
    toast(message);
  }, [isError, error]);

  return (
    <div className="space-y-4 p-4">
      <MottoSection
        motto={room?.motto ?? '우리 집 가훈을 다같이 정해볼까요?'}
      />
      <MembersSection members={room?.members ?? []} />
      <DashboardSection missedCount={missedCount} />
      <ListSection title="오늘 할 일">
        {visibleTodayTodos.length === 0 ? (
          <EmptyState message="오늘 할 일이 없어요" />
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
