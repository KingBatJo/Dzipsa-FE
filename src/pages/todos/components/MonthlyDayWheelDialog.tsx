import { useEffect, useState } from 'react';

import AppButton from '@/components/common/AppButton';
import AppDialog from '@/components/common/AppDialog';
import Picker from 'react-mobile-picker';
import { cn } from '@/lib/utils';

type MonthlyDayPickerValue = {
  day: string;
};

type MonthlyDayWheelDialogProps = {
  open: boolean;
  value: number;
  onOpenChange: (open: boolean) => void;
  onConfirm: (day: number) => void;
};

const DAY_MIN = 1;
const DAY_MAX = 31;

const toPickerDayValue = (day: number): MonthlyDayPickerValue => ({
  day: `${Math.min(Math.max(day, DAY_MIN), DAY_MAX)}일`,
});

const dayOptions = Array.from(
  { length: DAY_MAX - DAY_MIN + 1 },
  (_, index) => `${DAY_MIN + index}일`
);

const MonthlyDayWheelDialog = ({
  open,
  value,
  onOpenChange,
  onConfirm,
}: MonthlyDayWheelDialogProps) => {
  const [pickerValue, setPickerValue] = useState<MonthlyDayPickerValue>(
    toPickerDayValue(value)
  );

  useEffect(() => {
    if (!open) return;

    setPickerValue(toPickerDayValue(value));
  }, [open, value]);

  const handleConfirm = () => {
    const dayNumber = Number.parseInt(pickerValue.day, 10);
    const safeDay =
      Number.isFinite(dayNumber) && dayNumber >= DAY_MIN && dayNumber <= DAY_MAX
        ? dayNumber
        : DAY_MIN;

    onConfirm(safeDay);
  };

  return (
    <AppDialog
      open={open}
      onOpenChange={onOpenChange}
      title=""
      contentClassName="w-[300px] overflow-hidden"
    >
      <div className="flex flex-col justify-between pt-2">
        <div className="px-4">
          <Picker
            value={pickerValue}
            onChange={(nextValue) =>
              setPickerValue(nextValue as MonthlyDayPickerValue)
            }
            wheelMode="natural"
            itemHeight={52}
            height={156}
            className="flex items-start justify-center [&>div:last-child]:hidden"
          >
            <Picker.Column name="day">
              {dayOptions.map((option) => (
                <Picker.Item key={option} value={option}>
                  {({ selected }) => (
                    <p
                      className={cn(
                        'min-w-[62px] text-center text-xl leading-[42px] font-semibold whitespace-nowrap transition-colors',
                        selected ? 'text-black' : 'text-[#E6E6E6]'
                      )}
                    >
                      {option}
                    </p>
                  )}
                </Picker.Item>
              ))}
            </Picker.Column>
          </Picker>
        </div>

        <div className="flex items-center justify-between pt-8">
          <AppButton
            className="border-primary hover:bg-secondary bg-primary-foreground w-[128px] rounded-xl border text-zinc-800"
            onClick={() => onOpenChange(false)}
          >
            취소
          </AppButton>

          <AppButton
            className="text-primary-foreground w-[128px] rounded-xl bg-zinc-800 text-zinc-100"
            onClick={handleConfirm}
          >
            확인
          </AppButton>
        </div>
      </div>
    </AppDialog>
  );
};

export default MonthlyDayWheelDialog;
