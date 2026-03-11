import { forwardRef, useState } from 'react';

import ClearX from '@/assets/icon/clear_x.svg';
import { Edit3 } from 'lucide-react';
import ErrorTooltip from '@/components/form/ErrorToolTip';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

type EditableInputProps = {
  id: string;
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  maxLength?: number;
  errorMessage?: string;
  className?: string;
  inputClassName?: string;
};

const EditableInput = forwardRef<HTMLInputElement, EditableInputProps>(
  (
    {
      id,
      value,
      placeholder,
      onChange,
      onBlur,
      maxLength,
      errorMessage,
      className,
      inputClassName,
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleClear = () => {
      onChange('');
    };

    const handleEdit = () => {
      if (ref && typeof ref !== 'function') {
        ref.current?.focus();
      }
    };

    return (
      <ErrorTooltip message={errorMessage}>
        <div
          className={cn(
            'bg-secondary flex h-12 items-center gap-1 rounded-[10px] border px-4 shadow-xs transition-all duration-200',
            errorMessage
              ? 'border-red-500'
              : 'border-neutral-200 focus-within:border-neutral-900',
            className
          )}
        >
          <label htmlFor={id} className="sr-only">
            {placeholder}
          </label>

          <Input
            id={id}
            ref={ref}
            value={value}
            type="text"
            placeholder={placeholder}
            maxLength={maxLength}
            onFocus={() => setIsFocused(true)}
            onBlur={() => {
              setIsFocused(false);
              onBlur?.();
            }}
            onChange={(e) => onChange(e.target.value)}
            className={cn(
              'flex-1 border-none p-0 text-sm font-medium shadow-none focus-visible:ring-0',
              inputClassName
            )}
          />

          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={isFocused ? handleClear : handleEdit}
            aria-label={isFocused ? '입력값 지우기' : '수정'}
          >
            {isFocused ? (
              <img src={ClearX} alt="" className="h-4 w-4" />
            ) : (
              <Edit3 className="h-4 w-4 text-[#AFAFAF]" />
            )}
          </button>
        </div>
      </ErrorTooltip>
    );
  }
);

EditableInput.displayName = 'EditableInput';

export default EditableInput;
