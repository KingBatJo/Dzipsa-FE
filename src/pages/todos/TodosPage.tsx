import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNavigate, useParams } from 'react-router-dom';

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
    <div className="px-4 pt-6">
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

        <TabsContent value={TODO_TABS.MY}>my</TabsContent>
        <TabsContent value={TODO_TABS.HOUSE}>house</TabsContent>
        <TabsContent value={TODO_TABS.COMPLETED}>completed</TabsContent>
      </Tabs>
    </div>
  );
};

export default TodosPage;
