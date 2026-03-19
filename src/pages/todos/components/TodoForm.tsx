import {
  ControlledEditableInputSection,
  ControlledTextareaSection,
} from '@/components/form/ControlledTextSections';
import FormPageLayout from '@/components/form/FormPageLayout';
import { mockMembers } from '@/mocks/mockData';
import {
  TODO_MEMO_MAX_LENGTH,
  TODO_TITLE_MAX_LENGTH,
  todoCreateSchema,
  type TodoCreateValues,
} from '@/schemas/todoCreateSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import AppButton from '@/components/common/AppButton';
import RepeatSection from '@/pages/todos/components/RepeatSection';
import { formatDate } from '@/utils/date';
import { cn } from '@/lib/utils';
import DateWheelDialog from '@/pages/todos/components/DateWheelDialog';
import RandomAssignOverlay from '@/pages/todos/components/RandomAssignOverlay';
import type { RepeatValue, TodoFormValues } from '@/types/todo';
import { createDefaultRepeatValue } from '@/utils/todoForm';

type TodoFormMode = 'create' | 'edit';
type RandomAssignStage = 'idle' | 'loading' | 'result';

type TodoFormProps = {
  mode: TodoFormMode;
  initialValues?: Partial<TodoFormValues>;
  onSubmit: (values: TodoFormValues) => void;
};

const TodoForm = ({ mode, initialValues, onSubmit }: TodoFormProps) => {
  const [isDueDateDialogOpen, setIsDueDateDialogOpen] = useState(false);

  const [dueDate, setDueDate] = useState<Date | null>(
    initialValues?.dueDate ?? new Date()
  );

  const [selectedAssigneeId, setSelectedAssigneeId] = useState<number>(
    initialValues?.assigneeId ?? mockMembers[0]?.id ?? 0
  );

  const [repeatValue, setRepeatValue] = useState<RepeatValue>(
    initialValues?.repeatValue ?? createDefaultRepeatValue()
  );

  const [randomAssignStage, setRandomAssignStage] =
    useState<RandomAssignStage>('idle');
  const [randomCandidateAssigneeId, setRandomCandidateAssigneeId] = useState<
    number | null
  >(null);
  const [randomAssignedAssigneeId, setRandomAssignedAssigneeId] = useState<
    number | null
  >(null);

  const randomAssignTimeoutRef = useRef<number | null>(null);

  const isRandomAssigneeLocked = randomAssignedAssigneeId !== null;
  const randomCandidate = mockMembers.find(
    (member) => member.id === randomCandidateAssigneeId
  );

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<TodoCreateValues>({
    resolver: zodResolver(todoCreateSchema),
    mode: 'onChange',
    defaultValues: {
      title: initialValues?.title ?? '',
      memo: initialValues?.memo ?? '',
    },
  });

  useEffect(() => {
    return () => {
      if (randomAssignTimeoutRef.current) {
        window.clearTimeout(randomAssignTimeoutRef.current);
      }
    };
  }, []);

  const handleRandomAssign = () => {
    if (mode === 'edit') return;
    if (isRandomAssigneeLocked) return;

    if (randomAssignTimeoutRef.current) {
      window.clearTimeout(randomAssignTimeoutRef.current);
    }

    setRandomAssignStage('loading');
    setRandomCandidateAssigneeId(null);

    randomAssignTimeoutRef.current = window.setTimeout(() => {
      const randomMember =
        mockMembers[Math.floor(Math.random() * mockMembers.length)];
      setRandomCandidateAssigneeId(randomMember.id);
      setRandomAssignStage('result');
    }, 1200);
  };

  const handleCloseRandomOverlay = () => {
    if (randomAssignTimeoutRef.current) {
      window.clearTimeout(randomAssignTimeoutRef.current);
      randomAssignTimeoutRef.current = null;
    }

    setRandomAssignStage('idle');
    setRandomCandidateAssigneeId(null);
  };

  const handleConfirmRandomAssignee = () => {
    if (!randomCandidateAssigneeId) return;

    setSelectedAssigneeId(randomCandidateAssigneeId);
    setRandomAssignedAssigneeId(randomCandidateAssigneeId);
    setRandomAssignStage('idle');
    setRandomCandidateAssigneeId(null);

    if (repeatValue.enabled) {
      setRepeatValue((prev) => ({
        ...prev,
        enabled: false,
      }));
    }
  };

  const handleFormSubmit = (data: TodoCreateValues) => {
    onSubmit({
      title: data.title,
      memo: data.memo ?? '',
      dueDate,
      assigneeId: selectedAssigneeId,
      repeatValue,
    });
  };

  const handleSelectAssignee = (memberId: number) => {
    setSelectedAssigneeId(memberId);
  };

  return (
    <FormPageLayout
      title={mode === 'create' ? '할 일 등록' : '할 일 수정'}
      onSubmit={handleSubmit(handleFormSubmit)}
      submitDisabled={!isValid}
    >
      <ControlledEditableInputSection
        control={control}
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
                disabled={repeatValue.enabled}
                onClick={() => {
                  if (repeatValue.enabled) return;
                  setIsDueDateDialogOpen(true);
                }}
                className="text-muted-foreground bg-secondary border-border border text-lg font-semibold"
              >
                {dueDate ? `${formatDate(dueDate)} 까지` : '마감기한 선택'}
              </AppButton>

              {repeatValue.enabled && (
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
                  const isSelected = selectedAssigneeId === member.id;
                  const isRandomAssigned =
                    randomAssignedAssigneeId === member.id;

                  return (
                    <button
                      key={member.id}
                      type="button"
                      onClick={() => handleSelectAssignee(member.id)}
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
                  onClick={handleRandomAssign}
                  disabled={isRandomAssigneeLocked}
                  className="text-primary-foreground from-primary bg-gradient-to-r to-zinc-500 text-sm font-medium"
                >
                  랜덤으로 맡기기
                </AppButton>
              )}

              {isRandomAssigneeLocked && mode === 'create' && (
                <p className="text-destructive/50 pt-2 text-xs font-medium">
                  랜덤 배정 시 반복 설정은 사용할 수 없어요.
                </p>
              )}
            </div>
          </section>

          <RepeatSection
            value={repeatValue}
            onChange={setRepeatValue}
            disabled={isRandomAssigneeLocked}
          />

          <section className="space-y-4">
            <p className="text-base font-semibold">메모</p>

            <ControlledTextareaSection
              control={control}
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
        open={isDueDateDialogOpen}
        value={dueDate ?? new Date()}
        onOpenChange={setIsDueDateDialogOpen}
        onConfirm={(date) => {
          setDueDate(date);
          setIsDueDateDialogOpen(false);
        }}
      />

      {randomAssignStage !== 'idle' && mode === 'create' && (
        <RandomAssignOverlay
          stage={randomAssignStage}
          candidateName={randomCandidate?.name}
          onClose={handleCloseRandomOverlay}
          onConfirm={handleConfirmRandomAssignee}
        />
      )}
    </FormPageLayout>
  );
};

export default TodoForm;
