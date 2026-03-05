import { Camera, CheckCircle2 } from 'lucide-react';

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
  return (
    <div className="space-y-8">
      <ListSection title="오늘 할 일">
        <ListItemCard
          title="안녕"
          subtitle="오늘 오전 9:00"
          right={<TodoItemActions />}
        />
      </ListSection>

      <ListSection title="예정된 할 일">
        <ListItemCard title="안녕" right={<TodoItemActions />} />
      </ListSection>
    </div>
  );
};

export default MyTodosTab;
