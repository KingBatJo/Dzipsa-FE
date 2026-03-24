import {
  ControlledEditableInputSection,
  ControlledTextareaSection,
} from '@/components/form/ControlledTextSections';
import {
  TODO_MEMO_MAX_LENGTH,
  TODO_TITLE_MAX_LENGTH,
} from '@/schemas/todoCreateSchema';
import { useEffect, useState } from 'react';

import AppButton from '@/components/common/AppButton';
import AppDialog from '@/components/common/AppDialog';
import DateWheelDialog from '@/pages/todos/components/DateWheelDialog';
import FormPageLayout from '@/components/form/FormPageLayout';
import RandomAssignOverlay from '@/pages/todos/components/RandomAssignOverlay';
import RepeatSection from '@/pages/todos/components/RepeatSection';
import type { TodoFormValues } from '@/types/todo';
import { cn } from '@/lib/utils';
import { formatDate } from '@/utils/date';
import randomComplete from '@/assets/random/random-complete.png';
import randomCompleteBackground from '@/assets/random/random-complete-background.png';
import randomLoading from '@/assets/random/random-loading.png';
import { useRoomMembersQuery } from '@/api/room/room.query';
import { useTodoFormModel } from '@/pages/todos/hooks/useTodoFormModel';

type TodoFormMode = 'create' | 'edit';

type TodoFormProps = {
  mode: TodoFormMode;
  initialValues?: Partial<TodoFormValues>;
  onSubmit: (values: TodoFormValues) => void;
  onDelete?: () => void;
  isSubmitting?: boolean;
};

const RANDOM_ASSIGN_ASSETS = [
  randomLoading,
  randomComplete,
  randomCompleteBackground,
] as const;

const TodoForm = ({
  mode,
  initialValues,
  onSubmit,
  onDelete,
  isSubmitting,
}: TodoFormProps) => {
  const { data: roomMembers = [] } = useRoomMembersQuery();
  const members = roomMembers.map((member) => ({
    id: member.id,
    name: member.nickname,
    profileImageUrl: member.profileImageUrl,
  }));
  const model = useTodoFormModel({ initialValues, onSubmit, members });
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  // 이미지 preload
  useEffect(() => {
    RANDOM_ASSIGN_ASSETS.forEach((assetSrc) => {
      const preloadedImage = new Image();
      preloadedImage.decoding = 'async';
      preloadedImage.src = assetSrc;
    });
  }, []);

  return (
    <FormPageLayout
      title={mode === 'create' ? '할 일 등록' : '할 일 편집'}
      onSubmit={model.form.submitForm}
      submitDisabled={
        !model.form.isValid ||
        isSubmitting ||
        (mode === 'edit' && !model.form.hasChanges)
      }
    >
      <div className="bg-zinc-100 pb-6">
        <div className="bg-white/60 px-[15px] pt-[15px] pb-[30px] backdrop-blur-xl">
          <ControlledEditableInputSection
            control={model.form.control}
            name="title"
            id="todo-title"
            placeholder="할 일을 입력하세요"
            maxLength={TODO_TITLE_MAX_LENGTH}
          />
        </div>

        <div className="flex flex-col gap-6 px-[15px] pt-6">
          <section className="flex flex-col gap-3">
            <h2 className="text-sm font-semibold text-zinc-400">기본 설정</h2>

            <div className="flex flex-col gap-2">
              <section className="flex flex-col gap-4 rounded-[20px] border border-zinc-100 bg-white p-4">
                <p className="text-base font-semibold">마감기한</p>

                <div className="flex flex-col gap-2">
                  <AppButton
                    disabled={model.state.repeatValue.enabled}
                    onClick={() => {
                      if (model.state.repeatValue.enabled) return;
                      model.actions.setIsDueDateDialogOpen(true);
                    }}
                    className="border border-zinc-200 bg-zinc-100 text-lg font-semibold text-zinc-300"
                  >
                    {model.state.dueDate
                      ? `${formatDate(model.state.dueDate)} 까지`
                      : '마감기한 선택'}
                  </AppButton>

                  <p className="text-right text-xs font-medium text-zinc-400">
                    반복 설정 시 선택한 요일에 맞춰 마감기한이 자동 지정됩니다.
                  </p>
                </div>
              </section>

              <section className="flex flex-col gap-4 rounded-[20px] border border-zinc-100 bg-white p-4">
                <p className="text-base font-semibold">담당자</p>

                <div className="flex flex-col gap-[10px]">
                  <div className="grid grid-cols-3 gap-2">
                    {members.map((member) => {
                      const isSelected =
                        model.state.selectedAssigneeId === member.id;
                      const isRandomAssigned =
                        model.state.randomAssignedAssigneeId === member.id;

                      return (
                        <button
                          key={member.id}
                          type="button"
                          onClick={() =>
                            model.actions.handleSelectAssignee(member.id)
                          }
                          title={member.name}
                          className={cn(
                            'h-10 min-w-0 rounded-[12px] border px-3 py-2 text-sm font-semibold transition-colors',
                            isSelected && isRandomAssigned
                              ? 'from-primary border-none bg-gradient-to-r to-zinc-500 text-white'
                              : isSelected
                                ? 'border-zinc-900 bg-zinc-800 text-zinc-100'
                                : 'border-zinc-100 bg-zinc-50 text-zinc-500 hover:bg-zinc-100'
                          )}
                        >
                          <span className="block w-full truncate whitespace-nowrap">
                            {member.name}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  <AppButton
                    onClick={model.actions.handleRandomAssign}
                    disabled={model.state.isRandomAssigneeLocked}
                    className="from-primary bg-gradient-to-r to-zinc-500 text-sm font-medium text-white"
                  >
                    운명에 맡기기
                  </AppButton>

                  {model.state.isRandomAssigneeLocked && (
                    <p className="text-destructive/50 text-xs font-medium">
                      랜덤 배정 시 반복 설정은 사용할 수 없어요.
                    </p>
                  )}
                </div>
              </section>
            </div>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-sm font-semibold text-zinc-400">추가 설정</h2>

            <div className="flex flex-col gap-2">
              <section className="rounded-[20px] bg-white p-4">
                <RepeatSection
                  value={model.state.repeatValue}
                  onChange={model.actions.setRepeatValue}
                  disabled={model.state.isRandomAssigneeLocked}
                />
              </section>

              <section className="flex flex-col gap-4 rounded-[20px] bg-white p-4">
                <p className="text-base font-semibold">메모</p>

                <ControlledTextareaSection
                  control={model.form.control}
                  name="memo"
                  id="todo-memo"
                  placeholder="메모를 입력하세요"
                  maxLength={TODO_MEMO_MAX_LENGTH}
                  containerClassName="flex flex-col gap-2"
                  textareaClassName="rounded-[20px] border-zinc-200 bg-zinc-100 p-4 text-sm font-semibold placeholder:text-zinc-300 focus:border-zinc-600"
                  counterClassName="text-xs font-medium text-zinc-400"
                />
              </section>
            </div>
          </section>

          {mode === 'edit' && (
            <AppButton
              onClick={() => setIsDeleteDialogOpen(true)}
              className="bg-red-500 text-base font-semibold text-white"
            >
              할 일 삭제
            </AppButton>
          )}
        </div>
      </div>

      <DateWheelDialog
        open={model.state.isDueDateDialogOpen}
        value={model.state.dueDate ?? new Date()}
        onOpenChange={model.actions.setIsDueDateDialogOpen}
        onConfirm={(date) => {
          model.actions.setDueDate(date);
          model.actions.setIsDueDateDialogOpen(false);
        }}
      />

      {model.state.randomAssignStage !== 'idle' && (
        <RandomAssignOverlay
          stage={model.state.randomAssignStage}
          candidateName={model.state.randomCandidate?.name}
          onClose={model.actions.handleCloseRandomOverlay}
          onConfirm={model.actions.handleConfirmRandomAssignee}
        />
      )}

      <AppDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        title="할 일 삭제 확인"
        contentClassName="w-[300px] p-4 pt-8 pb-4"
      >
        <div className="flex flex-col items-center gap-10">
          <h2 className="text-center text-base font-semibold text-black">
            할 일을 삭제하시겠습니까?
          </h2>

          <div className="flex w-full items-center justify-between">
            <AppButton
              onClick={() => setIsDeleteDialogOpen(false)}
              className="w-32 border border-zinc-800 text-zinc-800"
            >
              취소
            </AppButton>

            <AppButton
              onClick={() => {
                setIsDeleteDialogOpen(false);
                onDelete?.();
              }}
              className="w-32 bg-zinc-800 text-zinc-100"
            >
              확인
            </AppButton>
          </div>
        </div>
      </AppDialog>
    </FormPageLayout>
  );
};

export default TodoForm;
