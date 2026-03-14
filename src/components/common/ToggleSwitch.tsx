import { cn } from '@/lib/utils';

type ToggleSwitchProps = {
  checked: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
  ariaLabel?: string;
};

const ToggleSwitch = ({
  checked,
  onCheckedChange,
  disabled = false,
  className,
  ariaLabel = '토글 스위치',
}: ToggleSwitchProps) => {
  const handleClick = () => {
    if (disabled) return;
    onCheckedChange?.(!checked);
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={handleClick}
      className={cn(
        'relative inline-flex h-6 w-11 items-center rounded-full p-[2px] transition-colors duration-200',
        checked ? 'bg-primary' : 'bg-input',
        'disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
    >
      <span
        aria-hidden
        className={cn(
          'h-5 w-5 rounded-full transition-transform duration-200',
          checked
            ? 'bg-primary-foreground translate-x-5'
            : 'bg-background translate-x-0'
        )}
      />
    </button>
  );
};

export default ToggleSwitch;
