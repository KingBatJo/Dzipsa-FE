import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const TodosPage = () => {
  return (
    <div className="px-4 pt-6">
      <Tabs defaultValue="my">
        <TabsList className="grid h-12 w-full grid-cols-3 p-1.5">
          <TabsTrigger value="my" className="py-2">
            나의 할 일
          </TabsTrigger>
          <TabsTrigger value="house" className="py-2">
            우리 집 할 일
          </TabsTrigger>
          <TabsTrigger value="done" className="py-2">
            완료된 할 일
          </TabsTrigger>
        </TabsList>

        <TabsContent value="my">my</TabsContent>
        <TabsContent value="house">house</TabsContent>
        <TabsContent value="done">done</TabsContent>
      </Tabs>
    </div>
  );
};

export default TodosPage;
