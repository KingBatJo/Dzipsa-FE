import EditableInputSection from '@/components/form/EditableInputSection';
import ErrorToolTip from '@/components/form/ErrorToolTip';
import { cn } from '@/lib/utils';
import { validateTextMaxLength } from '@/utils/validators';
import { useState } from 'react';
import {
  Controller,
  type Control,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form';

type ControlledEditableInputSectionProps<TFormValues extends FieldValues> = {
  control: Control<TFormValues>;
  name: FieldPath<TFormValues>;
  id: string;
  placeholder: string;
  maxLength: number;
  className?: string;
};

type ControlledTextareaSectionProps<TFormValues extends FieldValues> = {
  control: Control<TFormValues>;
  name: FieldPath<TFormValues>;
  id: string;
  placeholder: string;
  maxLength: number;
  textareaClassName?: string;
  counterClassName?: string;
  containerClassName?: string;
};

const ControlledEditableInputSection = <TFormValues extends FieldValues>({
  control,
  name,
  id,
  placeholder,
  maxLength,
  className,
}: ControlledEditableInputSectionProps<TFormValues>) => {
  const [localErrorMessage, setLocalErrorMessage] = useState('');

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <EditableInputSection
          id={id}
          value={(field.value as string) ?? ''}
          placeholder={placeholder}
          maxLength={maxLength}
          onChange={(value) => {
            const maxLengthError = validateTextMaxLength(value, maxLength);

            if (maxLengthError) {
              setLocalErrorMessage(maxLengthError);
              return;
            }

            field.onChange(value);

            if (localErrorMessage) {
              setLocalErrorMessage('');
            }
          }}
          onBlur={() => {
            field.onBlur();
            setLocalErrorMessage('');
          }}
          errorMessage={localErrorMessage || fieldState.error?.message}
          inputRef={field.ref}
          className={className}
        />
      )}
    />
  );
};

const ControlledTextareaSection = <TFormValues extends FieldValues>({
  control,
  name,
  id,
  placeholder,
  maxLength,
  textareaClassName,
  counterClassName,
  containerClassName,
}: ControlledTextareaSectionProps<TFormValues>) => {
  const [localErrorMessage, setLocalErrorMessage] = useState('');

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <ErrorToolTip message={localErrorMessage || fieldState.error?.message}>
          <div className={cn('flex flex-col gap-1', containerClassName)}>
            <textarea
              id={id}
              placeholder={placeholder}
              className={cn(
                'h-[125px] w-full resize-none rounded-[12px] border bg-zinc-100 p-4 text-sm font-semibold outline-none placeholder:text-zinc-300',
                localErrorMessage || fieldState.error?.message
                  ? 'border-red-500'
                  : 'border-zinc-200 focus:border-zinc-600',
                textareaClassName
              )}
              value={(field.value as string) ?? ''}
              onChange={(event) => {
                const value = event.target.value;
                const maxLengthError = validateTextMaxLength(value, maxLength);

                if (maxLengthError) {
                  setLocalErrorMessage(maxLengthError);
                  return;
                }

                field.onChange(value);

                if (localErrorMessage) {
                  setLocalErrorMessage('');
                }
              }}
              onBlur={() => {
                field.onBlur();
                setLocalErrorMessage('');
              }}
              ref={field.ref}
            />

            <p
              className={cn(
                'flex justify-end text-xs font-medium text-zinc-400',
                counterClassName
              )}
            >
              최대 {maxLength}자
            </p>
          </div>
        </ErrorToolTip>
      )}
    />
  );
};

export { ControlledEditableInputSection, ControlledTextareaSection };
