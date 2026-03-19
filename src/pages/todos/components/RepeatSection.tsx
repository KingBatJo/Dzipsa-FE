import { Check, ChevronDown } from 'lucide-react';
import type { RepeatType, RepeatValue } from '@/types/todo';
import { useEffect, useRef, useState } from 'react';

import DateWheelDialog from '@/components/form/DateWheelDialog';
import { REPEAT_TYPE_OPTIONS } from '@/constants/todos';
import ToggleSwitch from '@/components/common/ToggleSwitch';
import type { WeekDay } from '@/constants/weekdays';
import WeekdaySelector from '@/components/form/WeekdaySelector';
import { cn } from '@/lib/utils';
import { formatDate } from '@/utils/date';

type DateFieldType = 'start' | 'end';

type RepeatSectionProps = {
  value: RepeatValue;
  onChange: (value: RepeatValue) => void;
  disabled?: boolean;
};

const RepeatSection = ({
  value,
  onChange,
  disabled = false,
}: RepeatSectionProps) => {
  const [isRepeatMenuOpen, setIsRepeatMenuOpen] = useState(false);
  const [activeDateField, setActiveDateField] = useState<DateFieldType | null>(
    null
  );

  const repeatTypeDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isRepeatMenuOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        repeatTypeDropdownRef.current &&
        !repeatTypeDropdownRef.current.contains(event.target as Node)
      ) {
        setIsRepeatMenuOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsRepeatMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isRepeatMenuOpen]);

  useEffect(() => {
    if (!disabled) return;
    setIsRepeatMenuOpen(false);
    setActiveDateField(null);
  }, [disabled]);

  const activeDialogDate =
    activeDateField === 'start'
      ? value.startDate
      : activeDateField === 'end'
        ? (value.endDate ?? value.startDate)
        : value.startDate;

  const handleToggleRepeat = (checked: boolean) => {
    if (disabled) return;

    onChange({
      ...value,
      enabled: checked,
    });

    if (!checked) {
      setIsRepeatMenuOpen(false);
      setActiveDateField(null);
    }
  };

  const handleChangeType = (type: RepeatType) => {
    if (disabled) return;

    onChange({
      ...value,
      type,
    });
    setIsRepeatMenuOpen(false);
  };

  const handleChangeDays = (days: WeekDay[]) => {
    if (disabled) return;

    onChange({
      ...value,
      days,
    });
  };

  const handleConfirmDate = (date: Date) => {
    if (disabled) return;

    if (activeDateField === 'start') {
      onChange({
        ...value,
        startDate: date,
        endDate: value.endDate && value.endDate < date ? date : value.endDate,
      });
      setActiveDateField(null);
      return;
    }

    if (activeDateField === 'end') {
      onChange({
        ...value,
        endDate: date,
      });
      setActiveDateField(null);
    }
  };

  return (
    <>
      <section className="space-y-4 text-base font-semibold">
        <div className="flex items-center justify-between">
          <p>반복</p>

          <ToggleSwitch
            checked={value.enabled}
            onCheckedChange={handleToggleRepeat}
            disabled={disabled}
            ariaLabel="반복 설정 토글"
          />
        </div>

        {value.enabled && (
          <div className="flex flex-col gap-[15px]">
            <div
              className="relative flex justify-end"
              ref={repeatTypeDropdownRef}
            >
              <button
                type="button"
                disabled={disabled}
                className="flex items-center gap-1 disabled:opacity-50"
                onClick={() => setIsRepeatMenuOpen((prevOpen) => !prevOpen)}
                aria-haspopup="menu"
                aria-expanded={isRepeatMenuOpen}
              >
                <span>{value.type}</span>
                <ChevronDown
                  className={cn(
                    'h-6 w-6 transition-transform',
                    isRepeatMenuOpen && 'rotate-180'
                  )}
                />
              </button>

              {isRepeatMenuOpen && (
                <ul
                  role="menu"
                  className="absolute top-[calc(100%+6px)] right-0 z-10 w-[77px] rounded-md border border-[#898887] bg-[#696867] p-1 text-xs font-medium text-white shadow-md"
                >
                  {REPEAT_TYPE_OPTIONS.map((option) => (
                    <li key={option}>
                      <button
                        type="button"
                        disabled={disabled}
                        role="menuitemradio"
                        aria-checked={value.type === option}
                        className="flex w-full items-center gap-1 rounded-md px-2 py-1.5 text-left hover:bg-[#525150] disabled:opacity-50 disabled:hover:bg-transparent"
                        onClick={() => handleChangeType(option)}
                      >
                        <div className="flex gap-1">
                          <span>
                            {value.type === option ? (
                              <Check className="h-4 w-4" />
                            ) : (
                              <div className="h-4 w-4" />
                            )}
                          </span>
                          <span className="text-xs font-medium">{option}</span>
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {value.type === '매주' && (
              <WeekdaySelector
                value={value.days}
                onChange={handleChangeDays}
                disabled={disabled}
              />
            )}

            <div className="flex flex-col gap-[15px]">
              <div className="flex items-center justify-between">
                <p>시작 날짜</p>

                <button
                  type="button"
                  disabled={disabled}
                  className="flex items-center gap-1 disabled:opacity-50"
                  onClick={() => setActiveDateField('start')}
                >
                  <span>{formatDate(value.startDate)}</span>
                  <ChevronDown
                    className={cn(
                      'h-6 w-6 transition-transform',
                      activeDateField === 'start' && 'rotate-180'
                    )}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <p>종료 날짜</p>

                <button
                  type="button"
                  disabled={disabled}
                  className="flex items-center gap-1 disabled:opacity-50"
                  onClick={() => setActiveDateField('end')}
                >
                  <span>
                    {value.endDate ? formatDate(value.endDate) : '없음'}
                  </span>
                  <ChevronDown
                    className={cn(
                      'h-6 w-6 transition-transform',
                      activeDateField === 'end' && 'rotate-180'
                    )}
                  />
                </button>
              </div>
            </div>
          </div>
        )}
      </section>

      <DateWheelDialog
        open={activeDateField !== null}
        value={activeDialogDate}
        onOpenChange={(open) => {
          if (!open) {
            setActiveDateField(null);
          }
        }}
        onConfirm={handleConfirmDate}
      />
    </>
  );
};

export default RepeatSection;
