import { HEADER_HEIGHT, MOBILE_MAX_WIDTH } from '@/constants/layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import CompletedTodosTab from '@/pages/todos/components/CompletedTodosTab';
import type { HouseMemberRouteState } from '@/pages/todos/components/HouseTodosTab';
import HouseTodosTab from '@/pages/todos/components/HouseTodosTab';
import MyTodosTab from '@/pages/todos/components/MyTodosTab';
import { TODO_TABS } from '@/constants/todos';
import TodoDetailSheet from '@/pages/todos/components/TodoDetailSheet';
import type { TodoInstanceId } from '@/api/todo/todo.types';
import { cn } from '@/lib/utils';

const TABS = [
  { value: TODO_TABS.MY, label: '나의 할 일' },
  { value: TODO_TABS.HOUSE, label: '우리집 할 일' },
  { value: TODO_TABS.COMPLETED, label: '완료된 할 일' },
];

const TODO_TABS_BAR_HEIGHT = 40;

const TodosPage = () => {
  const { tab } = useParams();
  const navigate = useNavigate();

  const [selectedInstanceId, setSelectedInstanceId] =
    useState<TodoInstanceId | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);

  const handleTodoClick = (instanceId: TodoInstanceId) => {
    setSelectedInstanceId(instanceId);
    setDetailOpen(true);
  };

  const handleDetailOpenChange = (open: boolean) => {
    setDetailOpen(open);
    if (!open) setSelectedInstanceId(null);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [tab]);

  return (
    <div>
      <div
        aria-hidden
        className={`pointer-events-none fixed top-0 left-1/2 z-[8] w-full -translate-x-1/2 bg-white/60 backdrop-blur-xl ${MOBILE_MAX_WIDTH}`}
        style={{ height: HEADER_HEIGHT + TODO_TABS_BAR_HEIGHT }}
      />

      <Tabs value={tab} onValueChange={(value) => navigate(`/todos/${value}`)}>
        <TabsList
          className="sticky z-10 flex h-10 w-full justify-between rounded-none border-b border-b-zinc-200 bg-transparent p-0 px-[15px] pt-[5px]"
          style={{ top: HEADER_HEIGHT }}
        >
          {TABS.map((item) => (
            <TabsTrigger
              key={item.value}
              value={item.value}
              className={cn(
                'h-[35px] w-25 rounded-none rounded-t-md px-2.5 py-2 text-base leading-[19px] font-semibold text-zinc-400',
                'hover:text-zinc-500 active:text-zinc-600',
                'data-[state=active]:bg-transparent data-[state=active]:text-zinc-600 data-[state=active]:shadow-[inset_0_-2px_0_0_rgb(82_82_91)]'
              )}
            >
              {item.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <div className="px-[15px] pt-7.5 pb-24">
          <TabsContent value={TODO_TABS.MY}>
            <MyTodosTab onTodoClick={handleTodoClick} />
          </TabsContent>

          <TabsContent value={TODO_TABS.HOUSE}>
            <HouseTodosTab
              onCategoryClick={(type) =>
                navigate(`/todos/list/category/${type}`)
              }
              onMemberClick={(memberId, memberState: HouseMemberRouteState) =>
                navigate(`/todos/list/member/${memberId}`, {
                  state: { member: memberState },
                })
              }
            />
          </TabsContent>

          <TabsContent value={TODO_TABS.COMPLETED}>
            <CompletedTodosTab onTodoClick={handleTodoClick} />
          </TabsContent>
        </div>
      </Tabs>

      {/* 탭바 그라데이션 */}
      <div
        aria-hidden
        className={`pointer-events-none fixed bottom-0 left-1/2 z-7 h-53 w-full -translate-x-1/2 bg-[linear-gradient(180deg,rgba(244,244,245,0)_6%,#F4F4F5_67.886%)] blur-[2px] ${MOBILE_MAX_WIDTH}`}
      />

      {/* 할일 추가 플로팅 버튼 */}
      <div
        className={`pointer-events-none fixed bottom-20 left-1/2 z-10 w-full -translate-x-1/2 p-4 ${MOBILE_MAX_WIDTH}`}
      >
        <div className="flex justify-end">
          <Button
            onClick={() => navigate('/todos/new', { state: { fromTab: tab } })}
            className="pointer-events-auto h-15 w-15 rounded-full"
          >
            <span className="-translate-y-0.5 text-3xl font-light">+</span>
          </Button>
        </div>
      </div>

      {/* 할일 상세보기 */}
      <TodoDetailSheet
        open={detailOpen}
        onOpenChange={handleDetailOpenChange}
        instanceId={selectedInstanceId}
      />
    </div>
  );
};

export default TodosPage;
