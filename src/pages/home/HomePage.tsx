import { PROFILE_IMAGE, mockMembers, mockTodoList } from '@/mocks/mockData';

import DashboardSection from '@/pages/home/components/DashboardSection';
import ListItemCard from '@/components/common/ListItemCard';
import ListSection from '@/components/common/ListSection';
import MembersSection from '@/pages/home/components/MembersSection';
import MottoSection from '@/pages/home/components/MottoSection';
import UserAvatar from '@/components/common/UserAvatar';
import { formatDueDate } from '@/utils/date';

const HomePage = () => {
  const motto = '깨끗하게 살자!';

  return (
    <div className="space-y-4 p-4">
      <MottoSection motto={motto} />
      <MembersSection members={mockMembers} />
      <DashboardSection />
      <ListSection title="나의 할 일 리스트">
        {mockTodoList.map((todo) => (
          <ListItemCard
            key={todo.id}
            title={todo.title}
            subtitle={formatDueDate(todo.dueDate)}
            right={<UserAvatar src={PROFILE_IMAGE} />}
            onClick={() => {}}
          />
        ))}
      </ListSection>
    </div>
  );
};

export default HomePage;
