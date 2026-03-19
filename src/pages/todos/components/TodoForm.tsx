import {
  ControlledEditableInputSection,
  ControlledTextareaSection,
} from '@/components/form/ControlledTextSections';
import FormPageLayout from '@/components/form/FormPageLayout';
import AppButton from '@/components/common/AppButton';
import DateWheelDialog from '@/pages/todos/components/DateWheelDialog';
import RandomAssignOverlay from '@/pages/todos/components/RandomAssignOverlay';
import RepeatSection from '@/pages/todos/components/RepeatSection';
import { mockMembers } from '@/mocks/mockData';
import {
  TODO_MEMO_MAX_LENGTH,
  TODO_TITLE_MAX_LENGTH,
} from '@/schemas/todoCreateSchema';
import type { TodoFormValues } from '@/types/todo';
import { cn } from '@/lib/utils';
import { formatDate } from '@/utils/date';
import { useTodoFormModel } from '@/pages/todos/hooks/useTodoFormModel';

type TodoFormMode = 'create' | 'edit';

type TodoFormProps = {
  mode: TodoFormMode;
  initialValues?: Partial<TodoFormValues>;
  onSubmit: (values: TodoFormValues) => void;
};

const TodoForm = ({ mode, initialValues, onSubmit }: TodoFormProps) => {
  const model = useTodoFormModel({
    mode,
    initialValues,
    onSubmit,
  });

  return (
    <FormPageLayout
      title={mode === 'create' ? '할 일 등록' : '할 일 수정'}
      onSubmit={model.form.submitForm}
      submitDisabled={!model.form.isValid}
    >
      <ControlledEditableInputSection
        control={model.form.control}
        name="title"
        id="todo-title"
        placeholder="할 일을 입력하세요"
        maxLength={TODO_TITLE_MAX_LENGTH}
        className="px-4"
      />

      <div className="mt-[26px] mb-[30px] h-3 bg-neutral-100" />

      <div className="px-4">
        <p className="text-sm font-semibold text-[#BCBCBC]">상세 설정</p>

        <div className="flex flex-col gap-[30px] pt-6">
          <section className="space-y-4">
            <p className="text-base font-semibold">마감기한</p>

            <div>
              <AppButton
                disabled={model.state.repeatValue.enabled}
                onClick={() => {
                  if (model.state.repeatValue.enabled) return;
                  model.actions.setIsDueDateDialogOpen(true);
                }}
                className="text-muted-foreground bg-secondary border-border border text-lg font-semibold"
              >
                {model.state.dueDate
                  ? `${formatDate(model.state.dueDate)} 까지`
                  : '마감기한 선택'}
              </AppButton>

              {model.state.repeatValue.enabled && (
                <p className="text-destructive/50 pt-2 text-xs font-medium">
                  반복 설정 시 마감기한은 설정할 수 없어요.
                </p>
              )}
            </div>
          </section>

          <section className="space-y-4">
            <p className="text-base font-semibold">담당자</p>

            <div className="flex flex-col gap-[10px]">
              <div className="grid grid-cols-4 gap-[10px]">
                {mockMembers.map((member) => {
                  const isSelected = model.state.selectedAssigneeId === member.id;
                  const isRandomAssigned =
                    model.state.randomAssignedAssigneeId === member.id;

                  return (
                    <button
                      key={member.id}
                      type="button"
                      onClick={() => model.actions.handleSelectAssignee(member.id)}
                      className={cn(
                        'rounded-full border px-4 py-2 text-base font-semibold transition-colors',
                        isSelected && isRandomAssigned
                          ? 'from-primary border-none bg-gradient-to-r to-zinc-500 text-white'
                          : isSelected
                            ? 'border-border bg-primary text-white'
                            : 'border-border hover:bg-secondary'
                      )}
                    >
                      {member.name}
                    </button>
                  );
                })}
              </div>

              {mode === 'create' && (
                <AppButton
                  onClick={model.actions.handleRandomAssign}
                  disabled={model.state.isRandomAssigneeLocked}
                  className="text-primary-foreground from-primary bg-gradient-to-r to-zinc-500 text-sm font-medium"
                >
                  랜덤으로 맡기기
                </AppButton>
              )}

              {model.state.isRandomAssigneeLocked && mode === 'create' && (
                <p className="text-destructive/50 pt-2 text-xs font-medium">
                  랜덤 배정 시 반복 설정은 사용할 수 없어요.
                </p>
              )}
            </div>
          </section>

          <RepeatSection
            value={model.state.repeatValue}
            onChange={model.actions.setRepeatValue}
            disabled={model.state.isRandomAssigneeLocked}
          />

          <section className="space-y-4">
            <p className="text-base font-semibold">메모</p>

            <ControlledTextareaSection
              control={model.form.control}
              name="memo"
              id="todo-memo"
              placeholder="메모를 입력하세요"
              maxLength={TODO_MEMO_MAX_LENGTH}
              containerClassName="flex flex-col gap-1"
              textareaClassName="border-border bg-secondary rounded-[10px] px-4 py-2 text-sm font-medium placeholder:font-medium placeholder:text-neutral-400 focus:border-neutral-900"
              counterClassName="text-xs font-semibold text-[#BCBCBC]"
            />
          </section>
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

      {model.state.randomAssignStage !== 'idle' && mode === 'create' && (
        <RandomAssignOverlay
          stage={model.state.randomAssignStage}
          candidateName={model.state.randomCandidate?.name}
          onClose={model.actions.handleCloseRandomOverlay}
          onConfirm={model.actions.handleConfirmRandomAssignee}
        />
      )}
    </FormPageLayout>
  );
};

export default TodoForm;

