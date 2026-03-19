import { cn } from '@/lib/utils';

type RuleNotifyButtonProps = {
  disabled?: boolean;
  onClick?: () => void;
};

const RuleNotifyButton = ({
  disabled = false,
  onClick,
}: RuleNotifyButtonProps) => {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={(event) => {
        event.stopPropagation();
        onClick?.();
      }}
      className={cn(
        'flex rounded-[10px] px-2.5 py-1.5 text-white',
        disabled
          ? 'cursor-default bg-zinc-200'
          : 'bg-zinc-500 hover:bg-zinc-600'
      )}
    >
      <span
        className={cn(
          'text-xs font-semibold',
          disabled ? 'text-zinc-400' : 'text-zinc-50'
        )}
      >
        {disabled ? '접수 완료!' : '집사에게 알리기'}
      </span>
    </button>
  );
};

export default RuleNotifyButton;
