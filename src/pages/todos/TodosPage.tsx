import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const TodosPage = () => {
  return (
    <div>
      <Tabs defaultValue="my">
        <TabsList>
          <TabsTrigger value="my">나의 할 일</TabsTrigger>
          <TabsTrigger value="house">우리 집 할 일</TabsTrigger>
          <TabsTrigger value="done">완료된 할 일</TabsTrigger>
        </TabsList>

        <TabsContent value="my">my</TabsContent>
        <TabsContent value="house">house</TabsContent>
        <TabsContent value="done">done</TabsContent>
      </Tabs>
    </div>
  );
};

export default TodosPage;
