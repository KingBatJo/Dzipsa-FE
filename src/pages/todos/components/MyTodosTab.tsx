import { Camera, CheckCircle2 } from 'lucide-react';
import { MOCK_MY_ID, MOCK_TODAY, mockTodoList } from '@/mocks/mockData';
import { formatDueAt, toLocalDateTime } from '@/utils/date';

import ListItemCard from '@/components/common/ListItemCard';
import ListSection from '@/components/common/ListSection';

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
        className="hover:bg-accent active:bg-accent-foreground/10 rounded-full p-1 transition-colors"
      >
        <Camera className="h-6 w-6" />
      </button>

      <button
        type="button"
        aria-label="할 일 완료"
        onClick={() => {
          console.log('할 일 완료 버튼 클릭!');
        }}
        className="hover:bg-accent active:bg-accent-foreground/10 rounded-full p-1 transition-colors"
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

  const todos = mockTodoList.map((t) => ({
    ...t,
    local: toLocalDateTime(t.dueAt),
  }));

  // 내 할 일만
  const myTodos = todos.filter((t) => t.assigneeId === myId);

  // 할 일 섹션 분류 (미완료만)
  const todayTodos = myTodos.filter(
    (t) => t.local.date === today && !t.completed
  );
  const missedTodos = myTodos.filter(
    (t) => t.local.date < today && !t.completed
  );
  const upcomingTodos = myTodos.filter(
    (t) => t.local.date > today && !t.completed
  );

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
        {todayTodos.length === 0 ? (
          <p className="text-muted-foreground px-1 text-sm">
            오늘 할 일이 없어요
          </p>
        ) : (
          todayTodos.map((todo) => (
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
