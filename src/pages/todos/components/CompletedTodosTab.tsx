import { MOCK_TODAY, mockMembers, mockTodoList } from '@/mocks/mockData';
import { addLocalToTodos, getTodoSections } from '@/utils/todos';

import { Card } from '@/components/ui/card';
import ListSection from '@/components/common/ListSection';
import RoundedBadge from '@/components/common/RoundedBadge';
import UserAvatar from '@/components/common/UserAvatar';
import { toLocalDateTime } from '@/utils/date';

type CompletedTodoFeedCardProps = {
  userName: string;
  todoTitle: string;
  dueDate: string;
  proofImageUrl?: string;
  isDelayed?: boolean;
};

type CompletedTodoFeedItemProps = CompletedTodoFeedCardProps & {
  profileImage?: string;
};

const CompletedTodoFeedCard = ({
  userName,
  todoTitle,
  dueDate,
  proofImageUrl,
  isDelayed = false,
}: CompletedTodoFeedCardProps) => {
  return (
    <Card className="flex flex-1 flex-col gap-3 border-slate-100 p-4">
      <p className="text-sm font-medium">
        {userName}님이 할 일을 완료하였습니다.
      </p>

      {proofImageUrl && (
        // 임시 (추후 img로 교체)
        <div className="bg-accent h-[150px] w-full rounded-xl"></div>
      )}

      <div className="flex gap-2">
        <RoundedBadge className="bg-slate-100 text-slate-600">
          {todoTitle}
        </RoundedBadge>

        {isDelayed && (
          <RoundedBadge className="bg-[#FFEDD5] text-[#FF602C]">
            지연 완료
          </RoundedBadge>
        )}
      </div>

      {/* 마감일 */}
      <p className="text-sm font-normal text-slate-400">{dueDate}</p>
    </Card>
  );
};

const CompletedTodoFeedItem = ({
  profileImage,
  ...props
}: CompletedTodoFeedItemProps) => {
  return (
    <div className="flex gap-4">
      <div className="pt-1">
        <UserAvatar src={profileImage} />
      </div>

      <CompletedTodoFeedCard {...props} />
    </div>
  );
};

const CompletedTodosTab = () => {
  const todosWithLocal = addLocalToTodos(mockTodoList);

  const { completedTodos } = getTodoSections(todosWithLocal, MOCK_TODAY);

  return (
    <ListSection title="Today">
      <div className="flex flex-col gap-8 pt-3">
        {completedTodos.map((todo) => {
          const member = mockMembers.find((m) => m.id === todo.assigneeId);

          return (
            <CompletedTodoFeedItem
              key={todo.id}
              userName={member?.name ?? '알 수 없음'}
              profileImage={member?.profileImage}
              todoTitle={todo.title}
              dueDate={todo.local.dueDate} // 임시 포맷
              isDelayed={
                !!todo.completedAt &&
                toLocalDateTime(todo.completedAt).date >
                  toLocalDateTime(todo.dueAt).date
              }
              proofImageUrl={todo.proofImageUrl}
            />
          );
        })}
      </div>
    </ListSection>
  );
};

export default CompletedTodosTab;
