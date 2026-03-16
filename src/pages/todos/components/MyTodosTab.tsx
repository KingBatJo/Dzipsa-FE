import { Camera, CheckCircle2 } from 'lucide-react';
import { MOCK_MY_ID, MOCK_TODAY, mockTodoList } from '@/mocks/mockData';
import { addLocalToTodos, getTodoSections } from '@/utils/todos';

import EmptyState from '@/components/common/EmptyState';
import ListItemCard from '@/components/common/ListItemCard';
import ListSection from '@/components/common/ListSection';
import type { TodoWithLocal } from '@/types/todo';
import { formatDueDateLabel } from '@/utils/date';

type MyTodosTabProps = {
  onTodoClick?: (todo: TodoWithLocal) => void;
};

const TodoItemActions = () => {
  return (
    <div className="flex items-center gap-1">
      <button
        type="button"
        aria-label="사진 첨부"
        onClick={(event) => {
          event.stopPropagation();
          console.log('사진 첨부 버튼 클릭!');
        }}
        className="hover:bg-accent-foreground/5 active:bg-accent-foreground/10 rounded-full p-1 transition-colors"
      >
        <Camera className="h-6 w-6" />
      </button>

      <button
        type="button"
        aria-label="할일 완료"
        onClick={(event) => {
          event.stopPropagation();
          console.log('할일 완료 버튼 클릭!');
        }}
        className="hover:bg-accent-foreground/5 active:bg-accent-foreground/10 rounded-full p-1 transition-colors"
      >
        <CheckCircle2 className="h-6 w-6" />
      </button>
    </div>
  );
};

const MyTodosTab = ({ onTodoClick }: MyTodosTabProps) => {
  // 임시
  const myId = MOCK_MY_ID;
  const today = MOCK_TODAY;

  const todos = addLocalToTodos(mockTodoList);

  // 내 할 일만
  const myTodos = todos.filter((todo) => todo.assigneeId === myId);

  // 할 일 섹션 분류
  const { todayTodos, missedTodos, upcomingTodos } = getTodoSections(
    myTodos,
    today
  );

  // 놓친 할 일 (미완료만 - 렌더링용)
  const visibleTodayTodos = todayTodos.filter((todo) => !todo.completed);

  return (
    <div className="space-y-8">
      {missedTodos.length > 0 && (
        <ListSection title="놓친 할일이 있어요!">
          {missedTodos.map((todo) => (
            <ListItemCard
              key={todo.id}
              title={todo.title}
              subtitle={formatDueDateLabel(todo.dueAt)}
              right={<TodoItemActions />}
              className="bg-destructive/10"
              onClick={() => onTodoClick?.(todo)}
            />
          ))}
        </ListSection>
      )}

      <ListSection title="오늘 할일">
        {visibleTodayTodos.length === 0 ? (
          <EmptyState message="오늘 할일이 없어요" />
        ) : (
          visibleTodayTodos.map((todo) => (
            <ListItemCard
              key={todo.id}
              title={todo.title}
              subtitle={formatDueDateLabel(todo.dueAt)}
              right={<TodoItemActions />}
              onClick={() => onTodoClick?.(todo)}
            />
          ))
        )}
      </ListSection>

      <ListSection title="예정된 할일">
        {upcomingTodos.length === 0 ? (
          <EmptyState message="예정된 할일이 없어요" />
        ) : (
          upcomingTodos.map((todo) => (
            <ListItemCard
              key={todo.id}
              title={todo.title}
              subtitle={formatDueDateLabel(todo.dueAt)}
              right={<TodoItemActions />}
              onClick={() => onTodoClick?.(todo)}
            />
          ))
        )}
      </ListSection>
    </div>
  );
};

export default MyTodosTab;
