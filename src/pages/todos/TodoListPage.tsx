import { MOCK_TODAY, mockMembers, mockTodoList } from '@/mocks/mockData';
import {
  addLocalToTodos,
  getDateDiffDays,
  getTodoSections,
  isTodoDelayed,
  sortByDueAtThenCreatedAtAsc,
} from '@/utils/todos';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import EmptyState from '@/components/common/EmptyState';
import ListItemCard from '@/components/common/ListItemCard';
import { MOBILE_MAX_WIDTH } from '@/constants/layout';
import TodoDetailSheet from '@/pages/todos/components/TodoDetailSheet';
import type { TodoWithLocal } from '@/types/todo';
import UserAvatar from '@/components/common/UserAvatar';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import dzipsaDefault from '@/assets/dzipsa/dzipsa-default.svg';
import { formatDueDateLabel } from '@/utils/date';

type TodoListCategory = 'today' | 'missed' | 'all';

const TodoListPage = () => {
  const navigate = useNavigate();
  const { type, memberId } = useParams();

  const [selectedInstanceId, setSelectedInstanceId] = useState<number | null>(
    null
  );
  const [detailOpen, setDetailOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, []);

  const todos = addLocalToTodos(mockTodoList);
  const { todayTodos, missedTodos } = getTodoSections(todos, MOCK_TODAY);
  const membersById = new Map(mockMembers.map((member) => [member.id, member]));

  const activeTodos = todos
    .filter((todo) => !todo.completed)
    .sort(sortByDueAtThenCreatedAtAsc);
  const todayActiveTodos = todayTodos.filter((todo) => !todo.completed);

  const getTodoListData = () => {
    if (memberId) {
      const assigneeId = Number(memberId);
      const member = mockMembers.find((item) => item.id === assigneeId);

      return {
        title: member ? `${member.name}님의 할 일` : '구성원 할 일',
        filteredTodos: activeTodos.filter(
          (todo) => todo.assigneeId === assigneeId
        ),
      };
    }

    switch (type as TodoListCategory) {
      case 'today':
        return { title: '오늘 할 일', filteredTodos: todayActiveTodos };
      case 'missed':
        return { title: '놓친 할 일', filteredTodos: missedTodos };
      case 'all':
      default:
        return { title: '모든 할 일', filteredTodos: activeTodos };
    }
  };

  const { title, filteredTodos } = getTodoListData();

  const handleTodoClick = (todo: TodoWithLocal) => {
    setSelectedInstanceId(todo.id);
    setDetailOpen(true);
  };

  const handleDetailOpenChange = (open: boolean) => {
    setDetailOpen(open);
    if (!open) setSelectedInstanceId(null);
  };

  return (
    <div className="min-h-dvh bg-zinc-100">
      <header
        className={cn(
          'fixed top-0 z-10 flex w-full items-center justify-center p-[15px] backdrop-blur-xl',
          MOBILE_MAX_WIDTH
        )}
      >
        <h1 className="text-lg leading-5 font-semibold">{title}</h1>

        <button
          type="button"
          onClick={() => navigate(-1)}
          className="absolute right-4"
          aria-label="닫기"
        >
          <X className="h-6 w-6" />
        </button>
      </header>

      <div className="flex flex-col gap-2 px-[15px] pt-[65px] pb-[15px]">
        {filteredTodos.length === 0 ? (
          <EmptyState
            variant="minimal"
            image={
              <img
                src={dzipsaDefault}
                alt="디집사 캐릭터"
                className="h-26 w-26 object-contain"
              />
            }
            title="우리집 할 일이 아직 없어요 !"
            description="함께 할 일을 하나 만들어보세요."
          />
        ) : (
          filteredTodos.map((todo) => {
            const isDelayed = isTodoDelayed(todo, MOCK_TODAY);

            return (
              <ListItemCard
                key={todo.id}
                title={todo.title}
                subtitle={formatDueDateLabel(todo.dueAt)}
                right={
                  <UserAvatar
                    src={membersById.get(todo.assigneeId)?.profileImage}
                  />
                }
                onClick={() => handleTodoClick(todo)}
                isDelayed={isDelayed}
                badge={`D+${getDateDiffDays(todo.dueAt, MOCK_TODAY)}`}
              />
            );
          })
        )}
      </div>

      <TodoDetailSheet
        open={detailOpen}
        onOpenChange={handleDetailOpenChange}
        instanceId={selectedInstanceId}
      />
    </div>
  );
};

export default TodoListPage;
