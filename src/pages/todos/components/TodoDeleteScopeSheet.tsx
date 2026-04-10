import type { DeleteRecurringTodoScope } from '@/api/todo/todo.types';
import AppButton from '@/components/common/AppButton';
import BottomSheet from '@/components/common/BottomSheet';

type TodoDeleteScopeSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectScope?: (scope: DeleteRecurringTodoScope) => void;
};

const DELETE_OPTIONS: Array<{
  scope: DeleteRecurringTodoScope;
  label: string;
}> = [
  { scope: 'ONLY_THIS', label: '이번 일정만 삭제' },
  { scope: 'SINCE_THIS', label: '이후 일정 모두 삭제' },
  { scope: 'ALL_RECURRING', label: '전체 반복 삭제' },
];

const SCOPE_BUTTON_CLASS_NAME =
  'bg-zinc-200 text-zinc-600 hover:border hover:border-red-500 hover:text-red-500 active:bg-red-600 active:text-white';

const TodoDeleteScopeSheet = ({
  open,
  onOpenChange,
  onSelectScope,
}: TodoDeleteScopeSheetProps) => {
  const handleSelectScope = (scope: DeleteRecurringTodoScope) => {
    onOpenChange(false);
    onSelectScope?.(scope);
  };

  return (
    <BottomSheet open={open} onOpenChange={onOpenChange}>
      <div className="flex flex-col pb-5">
        <div className="flex flex-col gap-[5px] px-5 py-[15px]">
          <p className="text-lg font-semibold text-black">
            반복 할 일 삭제 범위를 선택해 주세요
          </p>
          <p className="text-xs font-semibold text-zinc-400">
            할 일을 삭제하면 복구할 수 없어요.
          </p>
        </div>

        {DELETE_OPTIONS.map((option) => (
          <div key={option.scope} className="px-5 py-[5px]">
            <AppButton
              onClick={() => handleSelectScope(option.scope)}
              className={SCOPE_BUTTON_CLASS_NAME}
            >
              {option.label}
            </AppButton>
          </div>
        ))}
      </div>
    </BottomSheet>
  );
};

export default TodoDeleteScopeSheet;
