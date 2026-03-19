import { cn } from '@/lib/utils';

const WEEK_DAYS = ['월', '화', '수', '목', '금', '토', '일'] as const;

export type WeekDay = (typeof WEEK_DAYS)[number];

type WeekdaySelectorProps = {
  value: WeekDay[];
  onChange: (value: WeekDay[]) => void;
  disabled?: boolean;
  className?: string;
};

const WeekdaySelector = ({
  value,
  onChange,
  disabled = false,
  className,
}: WeekdaySelectorProps) => {
  const handleToggle = (day: WeekDay) => {
    if (disabled) return;

    if (value.includes(day)) {
      onChange(value.filter((selectedDay) => selectedDay !== day));
      return;
    }

    onChange([...value, day]);
  };

  return (
    <div className={cn('flex items-center justify-between', className)}>
      {WEEK_DAYS.map((day) => {
        const isSelected = value.includes(day);

        return (
          <button
            key={day}
            type="button"
            aria-pressed={isSelected}
            disabled={disabled}
            onClick={() => handleToggle(day)}
            className={cn(
              'h-[50px] w-10 rounded-[12px] border text-base font-semibold transition-colors disabled:opacity-50',
              isSelected
                ? 'border-zinc-900 bg-zinc-800 text-zinc-100'
                : 'border-zinc-100 bg-zinc-50 text-zinc-500'
            )}
          >
            {day}
          </button>
        );
      })}
    </div>
  );
};

export default WeekdaySelector;
