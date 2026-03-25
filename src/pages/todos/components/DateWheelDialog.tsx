import { useEffect, useState } from 'react';

import AppDialog from '@/components/common/AppDialog';
import { Button } from '@/components/ui/button';
import Picker from 'react-mobile-picker';
import { cn } from '@/lib/utils';

type PickerDateValue = {
  year: string;
  month: string;
  day: string;
};

type DateWheelDialogProps = {
  open: boolean;
  value: Date;
  onOpenChange: (open: boolean) => void;
  onConfirm: (date: Date) => void;
};

const YEAR_MIN = 2020;
const YEAR_MAX = 2040;

const getDaysInMonth = (year: number, month: number) => {
  return new Date(year, month, 0).getDate();
};

const toPickerDateValue = (date: Date): PickerDateValue => ({
  year: `${date.getFullYear()}년`,
  month: `${date.getMonth() + 1}월`,
  day: `${date.getDate()}일`,
});

type DateWheelColumnProps = {
  name: keyof PickerDateValue;
  options: string[];
};

const DateWheelColumn = ({ name, options }: DateWheelColumnProps) => {
  return (
    <Picker.Column name={name}>
      {options.map((option) => (
        <Picker.Item key={option} value={option}>
          {({ selected }) => (
            <p
              className={cn(
                'min-w-[62px] text-center text-[20px] leading-[28px] font-semibold whitespace-nowrap transition-colors',
                selected ? 'text-black' : 'text-[#CCCCCC]'
              )}
            >
              {option}
            </p>
          )}
        </Picker.Item>
      ))}
    </Picker.Column>
  );
};

const DateWheelDialog = ({
  open,
  value,
  onOpenChange,
  onConfirm,
}: DateWheelDialogProps) => {
  const [pickerValue, setPickerValue] = useState<PickerDateValue>(
    toPickerDateValue(value)
  );

  useEffect(() => {
    if (!open) return;

    setPickerValue(toPickerDateValue(value));
  }, [open, value]);

  const year = Number.parseInt(pickerValue.year, 10);
  const month = Number.parseInt(pickerValue.month, 10);
  const day = Number.parseInt(pickerValue.day, 10);
  const maxDay = getDaysInMonth(year, month);

  const yearOptions = Array.from(
    { length: YEAR_MAX - YEAR_MIN + 1 },
    (_, index) => `${YEAR_MIN + index}년`
  );

  const monthOptions = Array.from(
    { length: 12 },
    (_, index) => `${index + 1}월`
  );

  const dayOptions = Array.from(
    { length: maxDay },
    (_, index) => `${index + 1}일`
  );

  const handlePickerChange = (nextValue: PickerDateValue) => {
    const nextYear = Number.parseInt(nextValue.year, 10);
    const nextMonth = Number.parseInt(nextValue.month, 10);
    const nextDay = Number.parseInt(nextValue.day, 10);
    const nextMaxDay = getDaysInMonth(nextYear, nextMonth);

    setPickerValue({
      year: `${nextYear}년`,
      month: `${nextMonth}월`,
      day: `${Math.min(nextDay, nextMaxDay)}일`,
    });
  };

  const handleConfirm = () => {
    onConfirm(new Date(year, month - 1, Math.min(day, maxDay)));
  };

  return (
    <AppDialog
      open={open}
      onOpenChange={onOpenChange}
      title="날짜 선택"
      contentClassName="w-[300px] overflow-hidden"
    >
      <div className="flex flex-col justify-between pt-2">
        <div className="px-4">
          <Picker
            value={pickerValue}
            onChange={(nextValue) =>
              handlePickerChange(nextValue as PickerDateValue)
            }
            wheelMode="natural"
            itemHeight={52}
            height={156}
            className="flex items-start justify-center [&>div:last-child]:hidden"
          >
            <DateWheelColumn name="year" options={yearOptions} />
            <DateWheelColumn name="month" options={monthOptions} />
            <DateWheelColumn name="day" options={dayOptions} />
          </Picker>
        </div>

        <div className="flex items-center justify-center gap-3 pt-8">
          <Button
            type="button"
            className="border-primary hover:bg-secondary bg-primary-foreground h-12 w-[125px] rounded-lg border text-[#171717]"
            onClick={() => onOpenChange(false)}
          >
            취소
          </Button>

          <Button
            type="button"
            className="bg-primary text-primary-foreground h-12 w-[125px] rounded-lg"
            onClick={handleConfirm}
          >
            확인
          </Button>
        </div>
      </div>
    </AppDialog>
  );
};

export default DateWheelDialog;
