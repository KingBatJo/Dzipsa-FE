import EditableInputSection from '@/components/form/EditableInputSection';
import FormPageLayout from '@/components/form/FormPageLayout';
import {
  TODO_TITLE_MAX_LENGTH,
  todoCreateSchema,
  type TodoCreateValues,
} from '@/schemas/todoCreateSchema';
import { validateTextMaxLength } from '@/utils/validators';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';

import { Controller, useForm } from 'react-hook-form';

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
      bottom={<div>상세설정</div>}
    />
  );
};

export default TodoCreatePage;
