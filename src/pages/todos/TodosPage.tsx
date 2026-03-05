import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNavigate, useParams } from 'react-router-dom';

const TodosPage = () => {
  const { tab } = useParams();
  const navigate = useNavigate();

  return (
    <div className="px-4 pt-6">
      <Tabs value={tab} onValueChange={(value) => navigate(`/todos/${value}`)}>
        <TabsList className="grid h-12 w-full grid-cols-3 p-1.5">
          <TabsTrigger value="my" className="py-2">
            나의 할 일
          </TabsTrigger>
          <TabsTrigger value="house" className="py-2">
            우리 집 할 일
          </TabsTrigger>
          <TabsTrigger value="completed" className="py-2">
            완료된 할 일
          </TabsTrigger>
        </TabsList>

        <TabsContent value="my">my</TabsContent>
        <TabsContent value="house">house</TabsContent>
        <TabsContent value="completed">completed</TabsContent>
      </Tabs>
    </div>
  );
};

export default TodosPage;
