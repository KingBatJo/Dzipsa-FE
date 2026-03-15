import { cn } from '@/lib/utils';

const WEEK_DAYS = ['월', '화', '수', '목', '금', '토', '일'] as const;

export type WeekDay = (typeof WEEK_DAYS)[number];

type WeekdaySelectorProps = {
  value: WeekDay[];
  onChange: (value: WeekDay[]) => void;
  className?: string;
};

const WeekdaySelector = ({
  value,
  onChange,
  className,
}: WeekdaySelectorProps) => {
  const handleToggle = (day: WeekDay) => {
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
            onClick={() => handleToggle(day)}
            className={cn(
              'h-10 w-10 rounded-md text-sm font-semibold transition-colors',
              isSelected
                ? 'bg-primary text-primary-foreground'
                : 'bg-primary-foreground text-foreground'
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
