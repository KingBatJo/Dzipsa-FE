import RoundedBadge from '@/components/common/RoundedBadge';
import { cn } from '@/lib/utils';

type RoundedButtonProps = {
  disabled?: boolean;
  onClick?: () => void;
};

const RuleNotifyButton = ({
  disabled = false,
  onClick,
}: RoundedButtonProps) => {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className="rounded-full disabled:cursor-default"
    >
      <RoundedBadge
        className={cn(
          'text-white',
          disabled
            ? 'bg-[#D4D4D4]'
            : 'bg-[#636363] hover:bg-slate-700 active:bg-slate-800'
        )}
      >
        집사에게 알리기
      </RoundedBadge>
    </button>
  );
};

export default RuleNotifyButton;
