import { Check, ChevronDown } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import ToggleSwitch from '@/components/common/ToggleSwitch';
import WeekdaySelector, {
  type WeekDay,
} from '@/components/form/WeekdaySelector';
import { cn } from '@/lib/utils';

const REPEAT_CYCLE_OPTIONS = ['매주', '매월'] as const;
type RepeatCycle = (typeof REPEAT_CYCLE_OPTIONS)[number];

const RepeatSection = () => {
  const [isRepeatEnabled, setIsRepeatEnabled] = useState(false);
  const [repeatCycle, setRepeatCycle] = useState<RepeatCycle>('매주');
  const [isRepeatMenuOpen, setIsRepeatMenuOpen] = useState(false);
  const [repeatDays, setRepeatDays] = useState<WeekDay[]>(['월']);
  const repeatCycleDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isRepeatMenuOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        repeatCycleDropdownRef.current &&
        !repeatCycleDropdownRef.current.contains(event.target as Node)
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

  return (
    <section className="space-y-4 text-base font-semibold">
      <div className="flex items-center justify-between">
        <p>반복</p>

        <ToggleSwitch
          checked={isRepeatEnabled}
          onCheckedChange={(checked) => {
            setIsRepeatEnabled(checked);

            if (!checked) {
              setIsRepeatMenuOpen(false);
            }
          }}
          ariaLabel="반복 설정 토글"
        />
      </div>

      {isRepeatEnabled && (
        <div className="flex flex-col gap-[15px]">
          <div
            className="relative flex justify-end"
            ref={repeatCycleDropdownRef}
          >
            <button
              type="button"
              className="flex items-center gap-1"
              onClick={() => setIsRepeatMenuOpen((prevOpen) => !prevOpen)}
              aria-haspopup="menu"
              aria-expanded={isRepeatMenuOpen}
            >
              <span>{repeatCycle}</span>
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
                {REPEAT_CYCLE_OPTIONS.map((option) => (
                  <li key={option}>
                    <button
                      type="button"
                      role="menuitemradio"
                      aria-checked={repeatCycle === option}
                      className="flex w-full items-center gap-1 rounded-md px-2 py-1.5 text-left hover:bg-[#525150]"
                      onClick={() => {
                        setRepeatCycle(option);
                        setIsRepeatMenuOpen(false);
                      }}
                    >
                      <div className="flex gap-1">
                        <span>
                          {repeatCycle === option ? (
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

          {repeatCycle === '매주' && (
            <WeekdaySelector value={repeatDays} onChange={setRepeatDays} />
          )}

          <div className="flex flex-col gap-[15px]">
            <div className="flex items-center justify-between">
              <p>시작 날짜</p>

              <button type="button" className="flex items-center gap-1">
                <span>2026.03.15</span>
                <ChevronDown className="h-6 w-6 transition-transform" />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <p>종료 날짜</p>

              <button type="button" className="flex items-center gap-1">
                <span>없음</span>
                <ChevronDown className="h-6 w-6 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default RepeatSection;
