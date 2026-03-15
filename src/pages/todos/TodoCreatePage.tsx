import RoundedBadge from '@/components/common/RoundedBadge';
import EditableInputSection from '@/components/form/EditableInputSection';
import FormPageLayout from '@/components/form/FormPageLayout';
import { mockMembers } from '@/mocks/mockData';
import {
  TODO_MEMO_MAX_LENGTH,
  TODO_TITLE_MAX_LENGTH,
  todoCreateSchema,
  type TodoCreateValues,
} from '@/schemas/todoCreateSchema';
import { validateTextMaxLength } from '@/utils/validators';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';

import { Controller, useForm } from 'react-hook-form';
import AppButton from '@/components/common/AppButton';
import RepeatSection, {
  type RepeatCycle,
} from '@/pages/todos/components/RepeatSection';
import { formatDate } from '@/utils/date';
import type { WeekDay } from '@/components/form/WeekdaySelector';
import { cn } from '@/lib/utils';
import DateWheelDialog from '@/components/form/DateWheelDialog';
import ErrorTooltip from '@/components/form/ErrorTooltip';

export type RepeatValue = {
  enabled: boolean;
  cycle: RepeatCycle;
  days: WeekDay[];
  startDate: Date;
  endDate: Date | null;
};

const TodoCreatePage = () => {
  const [inputErrorMessage, setInputErrorMessage] = useState('');
  const [memoErrorMessage, setMemoErrorMessage] = useState('');
  const [isDueDateDialogOpen, setIsDueDateDialogOpen] = useState(false);
  const [dueDate, setDueDate] = useState<Date | null>(new Date());
  const [selectedAssigneeId, setSelectedAssigneeId] = useState<number | null>(
    mockMembers[0]?.id ?? null
  );
  const [repeatValue, setRepeatValue] = useState<RepeatValue>({
    enabled: false,
    cycle: '매주',
    days: ['월'],
    startDate: new Date(),
    endDate: null,
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<TodoCreateValues>({
    resolver: zodResolver(todoCreateSchema),
    mode: 'onChange',
    defaultValues: {
      title: '',
      memo: '',
    },
  });

  const handleRandomAssign = () => {
    const randomMember =
      mockMembers[Math.floor(Math.random() * mockMembers.length)];
    setSelectedAssigneeId(randomMember.id);
  };

  const onSubmit = (data: TodoCreateValues) => {
    const submitData = {
      title: data.title,
      memo: data.memo ?? '',
      dueDate: !repeatValue.enabled && dueDate ? formatDate(dueDate) : '',
      assigneeId: selectedAssigneeId,
      repeat: repeatValue.enabled
        ? {
            cycle: repeatValue.cycle,
            days: repeatValue.cycle === '매주' ? repeatValue.days : [],
            startDate: formatDate(repeatValue.startDate),
            endDate: repeatValue.endDate ? formatDate(repeatValue.endDate) : '',
          }
        : null,
    };

    console.log('할 일 등록:', submitData);
  };

  return (
    <FormPageLayout
      title="할 일 등록"
      onSubmit={handleSubmit(onSubmit)}
      submitDisabled={!isValid}
    >
      <Controller
        name="title"
        control={control}
        render={({ field }) => (
          <EditableInputSection
            id="todo-title"
            value={field.value}
            placeholder="할 일을 입력하세요"
            maxLength={TODO_TITLE_MAX_LENGTH}
            onChange={(value) => {
              const maxLengthError = validateTextMaxLength(
                value,
                TODO_TITLE_MAX_LENGTH
              );

              if (maxLengthError) {
                setInputErrorMessage(maxLengthError);
                return;
              }

              field.onChange(value);

              if (inputErrorMessage) {
                setInputErrorMessage('');
              }
            }}
            onBlur={() => {
              field.onBlur();
              setInputErrorMessage('');
            }}
            errorMessage={inputErrorMessage || errors.title?.message}
            inputRef={field.ref}
            className="px-4"
          />
        )}
      />

      <div className="mt-[26px] mb-[30px] h-3 bg-neutral-100" />

      <div className="px-4">
        <p className="text-sm font-semibold text-[#BCBCBC]">상세 설정</p>

        <div className="flex flex-col gap-[30px] pt-6">
          {/* 마감기한 */}
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

          {/* 담당자 */}
          <section className="space-y-4">
            <p className="text-base font-semibold">담당자</p>

            <div className="flex flex-col gap-[10px]">
              <div className="flex gap-[10px]">
                {mockMembers.map((member) => {
                  const isSelected = selectedAssigneeId === member.id;

                  return (
                    <button
                      key={member.id}
                      type="button"
                      onClick={() => setSelectedAssigneeId(member.id)}
                      className={cn(
                        'border-border rounded-full border',
                        isSelected ? 'bg-secondary' : 'hover:bg-secondary'
                      )}
                    >
                      <RoundedBadge>{member.name}</RoundedBadge>
                    </button>
                  );
                })}
              </div>

              <AppButton
                onClick={handleRandomAssign}
                className="text-primary-foreground from-primary bg-gradient-to-r to-zinc-500 text-sm font-medium"
              >
                운명에 맡기기
              </AppButton>
            </div>
          </section>

          {/* 반복 */}
          <RepeatSection value={repeatValue} onChange={setRepeatValue} />

          {/* 메모 */}
          <section className="space-y-4">
            <p className="text-base font-semibold">메모</p>

            <Controller
              name="memo"
              control={control}
              render={({ field }) => (
                <ErrorTooltip
                  message={memoErrorMessage || errors.memo?.message}
                >
                  <div className="flex flex-col gap-1">
                    <textarea
                      id="todo-memo"
                      placeholder="메모를 입력하세요"
                      className={cn(
                        'border-border bg-secondary h-[125px] resize-none rounded-[10px] border px-4 py-2',
                        memoErrorMessage || errors.memo?.message
                          ? 'border-red-500'
                          : 'border-neutral-200 focus:border-neutral-900'
                      )}
                      value={field.value}
                      onChange={(e) => {
                        const value = e.target.value;
                        const maxLengthError = validateTextMaxLength(
                          value,
                          TODO_MEMO_MAX_LENGTH
                        );

                        if (maxLengthError) {
                          setMemoErrorMessage(maxLengthError);
                          return;
                        }

                        field.onChange(value);

                        if (memoErrorMessage) {
                          setMemoErrorMessage('');
                        }
                      }}
                      onBlur={() => {
                        field.onBlur();
                        setMemoErrorMessage('');
                      }}
                      ref={field.ref}
                    />

                    <p className="flex justify-end text-xs font-semibold text-[#BCBCBC]">
                      최대 300글자
                    </p>
                  </div>
                </ErrorTooltip>
              )}
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
    </FormPageLayout>
  );
};

export default TodoCreatePage;
