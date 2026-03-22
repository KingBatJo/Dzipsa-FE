import {
  MOCK_MY_ID,
  MOCK_TODAY,
  mockMembers,
  mockTodoList,
} from '@/mocks/mockData';
import {
  addLocalToTodos,
  getDateDiffDays,
  getTodoSections,
  isTodoDelayed,
  sortByDueAtThenCreatedAtAsc,
} from '@/utils/todos';
import { useNavigate, useParams } from 'react-router-dom';

import EmptyState from '@/components/common/EmptyState';
import ListItemCard from '@/components/common/ListItemCard';
import { MOBILE_MAX_WIDTH } from '@/constants/layout';
import TodoDetailSheet from '@/pages/todos/components/TodoDetailSheet';
import type { TodoWithLocal } from '@/types/todo';
import UserAvatar from '@/components/common/UserAvatar';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatDueDateLabel } from '@/utils/date';
import { useState } from 'react';

type TodoListCategory = 'today' | 'missed' | 'all';

const TodoListPage = () => {
  const navigate = useNavigate();
  const { type, memberId } = useParams();

  const [selectedTodo, setSelectedTodo] = useState<TodoWithLocal | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);

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
        return { title: '지연된 할 일', filteredTodos: missedTodos };
      case 'all':
      default:
        return { title: '모든 할 일', filteredTodos: activeTodos };
    }
  };

  const { title, filteredTodos } = getTodoListData();

  const selectedAssignee = selectedTodo
    ? mockMembers.find((member) => member.id === selectedTodo.assigneeId)
    : undefined;

  const handleTodoClick = (todo: TodoWithLocal) => {
    setSelectedTodo(todo);
    setDetailOpen(true);
  };

  const handleDetailOpenChange = (open: boolean) => {
    setDetailOpen(open);
    if (!open) setSelectedTodo(null);
  };

  return (
    <div className="min-h-dvh bg-zinc-100">
      <header
        className={cn(
          `fixed top-0 z-10 flex w-full items-center justify-center p-[15px] backdrop-blur-xl`,
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
          <EmptyState message="표시할 할 일이 없어요" />
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
        todo={selectedTodo}
        myId={MOCK_MY_ID}
        assigneeName={selectedAssignee?.name}
        assigneeImage={selectedAssignee?.profileImage}
      />
    </div>
  );
};

export default TodoListPage;
