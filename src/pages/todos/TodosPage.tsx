import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNavigate, useParams } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import CompletedTodosTab from '@/pages/todos/components/CompletedTodosTab';
import HouseTodosTab from '@/pages/todos/components/HouseTodosTab';
import { MOBILE_MAX_WIDTH } from '@/constants/layout';
import MyTodosTab from '@/pages/todos/components/MyTodosTab';
import { TODO_TABS } from '@/constants/todos';

const TABS = [
  { value: TODO_TABS.MY, label: '나의 할 일' },
  { value: TODO_TABS.HOUSE, label: '우리 집 할 일' },
  { value: TODO_TABS.COMPLETED, label: '완료된 할 일' },
];

const TodosPage = () => {
  const { tab } = useParams();
  const navigate = useNavigate();

  return (
    <div className="p-4">
      <Tabs value={tab} onValueChange={(value) => navigate(`/todos/${value}`)}>
        <TabsList className="grid h-12 w-full grid-cols-3 gap-1 p-1.5">
          {TABS.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="hover:bg-foreground/5 py-2"
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* 나의 할 일 */}
        <TabsContent value={TODO_TABS.MY}>
          <MyTodosTab />
        </TabsContent>

        {/* 우리 집 할 일 */}
        <TabsContent value={TODO_TABS.HOUSE}>
          <HouseTodosTab />
        </TabsContent>

        {/* 완료된 할 일 */}
        <TabsContent value={TODO_TABS.COMPLETED}>
          <CompletedTodosTab />
        </TabsContent>
      </Tabs>

      {/* 할 일 추가 플로팅 버튼 */}
      <div
        className={`fixed bottom-20 left-1/2 z-10 w-full -translate-x-1/2 p-4 ${MOBILE_MAX_WIDTH}`}
      >
        <div className="flex justify-end">
          <Button
            onClick={() => navigate('/todos/new', { state: { fromTap: tab } })}
            className="h-15 w-15 rounded-full"
          >
            <span className="-translate-y-0.5 text-3xl font-light">+</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TodosPage;
