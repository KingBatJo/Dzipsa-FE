import EditableInput from '@/components/form/EditableInput';
import { cn } from '@/lib/utils';

type EditableInputSectionProps = {
  id: string;
  value: string;
  placeholder: string;
  maxLength: number;
  onChange: (value: string) => void;
  errorMessage?: string;
  onBlur?: () => void;
  inputRef?: React.Ref<HTMLInputElement>;
  className?: string;
};

const EditableInputSection = ({
  id,
  value,
  placeholder,
  maxLength,
  errorMessage,
  onChange,
  onBlur,
  inputRef,
  className,
}: EditableInputSectionProps) => {
  return (
    <section className={cn('flex flex-col gap-2', className)}>
      <EditableInput
        id={id}
        ref={inputRef}
        value={value}
        placeholder={placeholder}
        errorMessage={errorMessage}
        onChange={onChange}
        onBlur={onBlur}
      />

      <div className="flex justify-end text-xs font-medium text-zinc-400">
        최대 {maxLength}자
      </div>
    </section>
  );
};

export default EditableInputSection;
