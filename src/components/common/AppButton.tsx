import { cn } from '@/lib/utils';

type FormButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
};

const AppButton = ({
  children,
  onClick,
  disabled,
  className,
}: FormButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'h-12 w-full rounded-[12px] text-sm font-medium transition-colors',
        'disabled:pointer-events-none disabled:opacity-50',
        className
      )}
    >
      {children}
    </button>
  );
};

export default AppButton;
