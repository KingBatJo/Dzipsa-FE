import { MOCK_TODAY, mockMembers, mockTodoList } from '@/mocks/mockData';
import {
  addLocalToTodos,
  getTodoSections,
  getTodoStatusLabel,
} from '@/utils/todos';

import { Card } from '@/components/ui/card';
import ListSection from '@/components/common/ListSection';
import RoundedBadge from '@/components/common/RoundedBadge';
import type { TodoWithLocal } from '@/types/todo';
import UserAvatar from '@/components/common/UserAvatar';
import { cn } from '@/lib/utils';

type CompletedTodosTabProps = {
  onTodoClick?: (todo: TodoWithLocal) => void;
};

type CompletedTodoFeedCardProps = {
  userName: string;
  todoTitle: string;
  dueDate: string;
  proofImageUrl?: string;
  statusLabel: '완료' | '지연 완료';
  onClick?: () => void;
};

type CompletedTodoFeedItemProps = CompletedTodoFeedCardProps & {
  profileImage?: string;
};

const CompletedTodoFeedCard = ({
  userName,
  todoTitle,
  dueDate,
  proofImageUrl,
  statusLabel,
  onClick,
}: CompletedTodoFeedCardProps) => {
  return (
    <Card
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      className={cn(
        'flex flex-1 flex-col gap-3 border-slate-100 p-4',
        onClick && 'hover:cursor-pointer'
      )}
    >
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

        {statusLabel === '지연 완료' && (
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

const CompletedTodosTab = ({ onTodoClick }: CompletedTodosTabProps) => {
  const todosWithLocal = addLocalToTodos(mockTodoList);

  const { completedTodos } = getTodoSections(todosWithLocal, MOCK_TODAY);

  return (
    <ListSection title="Today">
      <div className="flex flex-col gap-8 pt-3">
        {completedTodos.map((todo) => {
          const member = mockMembers.find((m) => m.id === todo.assigneeId);
          const statusLabel = getTodoStatusLabel(todo, MOCK_TODAY);

          if (statusLabel !== '완료' && statusLabel !== '지연 완료') {
            return null;
          }

          return (
            <CompletedTodoFeedItem
              key={todo.id}
              onClick={() => onTodoClick?.(todo)}
              userName={member?.name ?? '알 수 없음'}
              profileImage={member?.profileImage}
              todoTitle={todo.title}
              dueDate={todo.local.dueDate} // 임시 포맷
              statusLabel={statusLabel}
              proofImageUrl={todo.proofImageUrl}
            />
          );
        })}
      </div>
    </ListSection>
  );
};

export default CompletedTodosTab;
