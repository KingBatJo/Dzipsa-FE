import { MOCK_MY_ID, mockMembers } from '@/mocks/mockData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNavigate, useParams } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import CompletedTodosTab from '@/pages/todos/components/CompletedTodosTab';
import HouseTodosTab from '@/pages/todos/components/HouseTodosTab';
import { MOBILE_MAX_WIDTH } from '@/constants/layout';
import MyTodosTab from '@/pages/todos/components/MyTodosTab';
import { TODO_TABS } from '@/constants/todos';
import TodoDetailSheet from '@/pages/todos/components/TodoDetailSheet';
import type { TodoWithLocal } from '@/types/todo';
import { useState } from 'react';

const TABS = [
  { value: TODO_TABS.MY, label: '나의 할 일' },
  { value: TODO_TABS.HOUSE, label: '우리집 할 일' },
  { value: TODO_TABS.COMPLETED, label: '완료된 할 일' },
];

const TodosPage = () => {
  const { tab } = useParams();
  const navigate = useNavigate();

  const [selectedTodo, setSelectedTodo] = useState<TodoWithLocal | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);

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
    <div className="p-4">
      <Tabs value={tab} onValueChange={(value) => navigate(`/todos/${value}`)}>
        <TabsList className="grid h-12 w-full grid-cols-3 gap-1 p-1.5">
          {TABS.map((item) => (
            <TabsTrigger
              key={item.value}
              value={item.value}
              className="hover:bg-foreground/5 py-2"
            >
              {item.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <div className="pt-2">
          <TabsContent value={TODO_TABS.MY}>
            <MyTodosTab onTodoClick={handleTodoClick} />
          </TabsContent>

          <TabsContent value={TODO_TABS.HOUSE}>
            <HouseTodosTab
              onCategoryClick={(type) =>
                navigate(`/todos/list/category/${type}`)
              }
              onMemberClick={(memberId) =>
                navigate(`/todos/list/member/${memberId}`)
              }
            />
          </TabsContent>

          <TabsContent value={TODO_TABS.COMPLETED}>
            <CompletedTodosTab onTodoClick={handleTodoClick} />
          </TabsContent>
        </div>
      </Tabs>

      {/* 할일 추가 플로팅 버튼 */}
      <div
        className={`fixed bottom-20 left-1/2 z-10 w-full -translate-x-1/2 p-4 ${MOBILE_MAX_WIDTH}`}
      >
        <div className="flex justify-end">
          <Button
            onClick={() => navigate('/todos/new', { state: { fromTab: tab } })}
            className="h-15 w-15 rounded-full"
          >
            <span className="-translate-y-0.5 text-3xl font-light">+</span>
          </Button>
        </div>
      </div>

      {/* 할일 상세보기 */}
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

export default TodosPage;
