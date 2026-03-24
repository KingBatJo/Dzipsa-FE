import { cn } from '@/lib/utils';

type TodoCompleteButtonProps = {
  isDelayed?: boolean;
  onClick?: () => void;
  ariaLabel?: string;
};

const TODO_COMPLETE_BUTTON_COLORS = {
  normal: {
    base: '#E4E4E7CC',
    hover: '#8F8F8FCC',
    active: '#565656CC',
  },
  delayed: {
    base: '#A68F8FCC',
    hover: '#8F8F8FCC',
    active: '#565656CC',
  },
} as const;

const TodoCompleteButton = ({
  isDelayed = false,
  onClick,
  ariaLabel = '할일 완료',
}: TodoCompleteButtonProps) => {
  const colors = isDelayed
    ? TODO_COMPLETE_BUTTON_COLORS.delayed
    : TODO_COMPLETE_BUTTON_COLORS.normal;

  return (
    <button
      type="button"
      aria-label={ariaLabel}
      onClick={onClick}
      className="group flex h-6 w-6 items-center justify-center"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M12 3C19.2 3 21 4.8 21 12C21 19.2 19.2 21 12 21C4.8 21 3 19.2 3 12C3 4.8 4.8 3 12 3Z"
          className={cn(
            'transition-colors duration-150',
            `fill-[${colors.base}]`,
            `group-hover:fill-[${colors.hover}]`,
            `group-active:fill-[${colors.active}]`
          )}
        />
      </svg>
    </button>
  );
};

export default TodoCompleteButton;
