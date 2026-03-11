import RoundedBadge from '@/components/common/RoundedBadge';
import EditableInputSection from '@/components/form/EditableInputSection';
import FormPageLayout from '@/components/form/FormPageLayout';
import { mockMembers } from '@/mocks/mockData';
import {
  TODO_TITLE_MAX_LENGTH,
  todoCreateSchema,
  type TodoCreateValues,
} from '@/schemas/todoCreateSchema';
import { validateTextMaxLength } from '@/utils/validators';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';

import { Controller, useForm } from 'react-hook-form';
import AppButton from '@/components/common/AppButton';

const TodoCreatePage = () => {
  const [inputErrorMessage, setInputErrorMessage] = useState('');

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<TodoCreateValues>({
    resolver: zodResolver(todoCreateSchema),
    mode: 'onChange',
    defaultValues: {
      title: '',
    },
  });

  const onSubmit = (data: TodoCreateValues) => {
    console.log('할 일 등록: ', data);
  };

  return (
    <FormPageLayout
      title="할 일 등록"
      onSubmit={handleSubmit(onSubmit)}
      submitDisabled={!isValid}
      top={
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
            />
          )}
        />
      }
      bottom={
        <div>
          <p className="text-sm font-semibold text-[#BCBCBC]">상세 설정</p>

          <div className="flex flex-col gap-[30px] pt-6">
            <div className="space-y-4">
              <p className="text-base font-semibold">마감기한</p>

              <AppButton className="text-muted-foreground bg-secondary border-border border text-lg font-semibold">
                {/* 기본값 오늘 */}
                2026.03.15 (토) 까지
              </AppButton>
            </div>

            <div className="space-y-4">
              <p className="text-base font-semibold">담당자</p>

              <div className="flex flex-col gap-[10px]">
                <div className="flex gap-[10px]">
                  {mockMembers.map((member) => (
                    <button
                      key={member.id}
                      type="button"
                      className="border-border hover:bg-secondary rounded-full border"
                    >
                      {/* 기본값 작성자 */}
                      <RoundedBadge>{member.name}</RoundedBadge>
                    </button>
                  ))}
                </div>

                <AppButton className="text-primary-foreground from-primary bg-gradient-to-r to-zinc-500 text-sm font-medium">
                  운명에 맡기기
                </AppButton>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-base font-semibold">반복</p>

                <div>토글 스위치</div>
              </div>

              <div>토글 on일 때만 보이도록</div>
            </div>

            <div className="space-y-4">
              <p className="text-base font-semibold">메모</p>

              <div className="flex flex-col gap-1">
                <textarea
                  name="todo-memo"
                  id="todo-memo"
                  placeholder="메모를 입력하세요"
                  className="border-border bg-secondary h-[125px] resize-none rounded-[10px] border px-4 py-2"
                />

                <p className="flex justify-end text-xs font-semibold text-[#BCBCBC]">
                  최대 300글자
                </p>
              </div>
            </div>
          </div>
        </div>
      }
    />
  );
};

export default TodoCreatePage;
