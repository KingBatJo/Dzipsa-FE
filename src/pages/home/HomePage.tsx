import {
  MOCK_MY_ID,
  MOCK_TODAY,
  PROFILE_IMAGE,
  mockMembers,
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
import { formatDueAt } from '@/utils/date';

const HomePage = () => {
  const motto = '깨끗하게 살자!';

  const myId = MOCK_MY_ID;
  const today = MOCK_TODAY;

  const todos = addLocalToTodos(mockTodoList);
  const myTodos = todos.filter((t) => t.assigneeId === myId);

  const { todayTodos, missedTodos } = getTodoSections(myTodos, today);

  const visibleTodayTodos = todayTodos.filter((t) => !t.completed);
  const missedCount = missedTodos.length;

  return (
    <div className="space-y-4 p-4">
      <MottoSection motto={motto} />
      <MembersSection members={mockMembers} />
      <DashboardSection missedCount={missedCount} />
      <ListSection title="오늘 할 일">
        {visibleTodayTodos.length === 0 ? (
          <EmptyState message="오늘 할 일이 없어요" />
        ) : (
          visibleTodayTodos.map((todo) => (
            <ListItemCard
              key={todo.id}
              title={todo.title}
              subtitle={formatDueAt(todo.dueAt)}
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
