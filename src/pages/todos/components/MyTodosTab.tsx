import { Camera, CheckCircle2 } from 'lucide-react';
import { MOCK_MY_ID, MOCK_TODAY, mockTodoList } from '@/mocks/mockData';
import { addLocalToTodos, getTodoSections } from '@/utils/todos';

import ListItemCard from '@/components/common/ListItemCard';
import ListSection from '@/components/common/ListSection';
import { formatDueAt } from '@/utils/date';

// Todo 카드 우측 액션 버튼 영역 (사진 첨부, 완료 처리)
const TodoItemActions = () => {
  return (
    <div className="flex items-center gap-1">
      <button
        type="button"
        aria-label="사진 첨부"
        onClick={() => {
          console.log('사진 첨부 버튼 클릭!');
        }}
        className="hover:bg-accent-foreground/5 active:bg-accent-foreground/10 rounded-full p-1 transition-colors"
      >
        <Camera className="h-6 w-6" />
      </button>

      <button
        type="button"
        aria-label="할 일 완료"
        onClick={() => {
          console.log('할 일 완료 버튼 클릭!');
        }}
        className="hover:bg-accent-foreground/5 active:bg-accent-foreground/10 rounded-full p-1 transition-colors"
      >
        <CheckCircle2 className="h-6 w-6" />
      </button>
    </div>
  );
};

const MyTodosTab = () => {
  // 임시
  const myId = MOCK_MY_ID;
  const today = MOCK_TODAY;

  const todos = addLocalToTodos(mockTodoList);

  // 내 할 일만
  const myTodos = todos.filter((t) => t.assigneeId === myId);

  // 할 일 섹션 분류
  const { todayTodos, missedTodos, upcomingTodos } = getTodoSections(
    myTodos,
    today
  );

  // 놓친 할 일 (미완료만 - 렌더링용)
  const visibleTodayTodos = todayTodos.filter((t) => !t.completed);

  return (
    <div className="space-y-8">
      {missedTodos.length > 0 && (
        <ListSection title="놓친 할 일이 있어요!">
          {missedTodos.map((todo) => (
            <ListItemCard
              key={todo.id}
              title={todo.title}
              subtitle={formatDueAt(todo.dueAt)}
              right={<TodoItemActions />}
              className="bg-destructive/10"
            />
          ))}
        </ListSection>
      )}

      <ListSection title="오늘 할 일">
        {visibleTodayTodos.length === 0 ? (
          <p className="text-muted-foreground px-1 text-sm">
            오늘 할 일이 없어요
          </p>
        ) : (
          visibleTodayTodos.map((todo) => (
            <ListItemCard
              key={todo.id}
              title={todo.title}
              subtitle={formatDueAt(todo.dueAt)}
              right={<TodoItemActions />}
            />
          ))
        )}
      </ListSection>

      <ListSection title="예정된 할 일">
        {upcomingTodos.length === 0 ? (
          <p className="text-muted-foreground px-1 text-sm">
            예정된 할 일이 없어요
          </p>
        ) : (
          upcomingTodos.map((todo) => (
            <ListItemCard
              key={todo.id}
              title={todo.title}
              subtitle={formatDueAt(todo.dueAt)}
              right={<TodoItemActions />}
            />
          ))
        )}
      </ListSection>
    </div>
  );
};

export default MyTodosTab;
