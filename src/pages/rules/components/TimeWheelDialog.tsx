import { useEffect, useState } from 'react';

import AppDialog from '@/components/common/AppDialog';
import { Button } from '@/components/ui/button';
import Picker from 'react-mobile-picker';
import { cn } from '@/lib/utils';

type PickerTimeValue = {
  period: '오전' | '오후';
  hour: string;
  minute: string;
};

type TimeWheelDialogProps = {
  open: boolean;
  value: string;
  onOpenChange: (open: boolean) => void;
  onConfirm: (time: string) => void;
};

const PERIOD_OPTIONS: PickerTimeValue['period'][] = ['오전', '오후'];
const HOUR_OPTIONS = Array.from({ length: 12 }, (_, index) =>
  String(index + 1)
);
const MINUTE_OPTIONS = Array.from({ length: 60 }, (_, index) =>
  String(index).padStart(2, '0')
);

const toPickerTimeValue = (time: string): PickerTimeValue => {
  const [hourText = '09', minuteText = '00'] = time.split(':');
  const hour24 = Number.parseInt(hourText, 10);
  const period: PickerTimeValue['period'] = hour24 < 12 ? '오전' : '오후';
  const hour12 = hour24 % 12 === 0 ? 12 : hour24 % 12;

  return {
    period,
    hour: String(hour12),
    minute: minuteText.padStart(2, '0'),
  };
};

const toTimeString = (value: PickerTimeValue) => {
  const hour12 = Number.parseInt(value.hour, 10);
  const minute = value.minute.padStart(2, '0');

  const hour24 =
    value.period === '오전'
      ? hour12 === 12
        ? 0
        : hour12
      : hour12 === 12
        ? 12
        : hour12 + 12;

  return `${String(hour24).padStart(2, '0')}:${minute}:00`;
};

type TimeWheelColumnProps = {
  name: keyof PickerTimeValue;
  options: string[];
};

const TimeWheelColumn = ({ name, options }: TimeWheelColumnProps) => {
  return (
    <Picker.Column name={name}>
      {options.map((option) => (
        <Picker.Item key={option} value={option}>
          {({ selected }) => (
            <p
              className={cn(
                'min-w-[56px] text-center text-[20px] leading-[28px] font-semibold whitespace-nowrap transition-colors',
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

const TimeWheelDialog = ({
  open,
  value,
  onOpenChange,
  onConfirm,
}: TimeWheelDialogProps) => {
  const [pickerValue, setPickerValue] = useState<PickerTimeValue>(
    toPickerTimeValue(value)
  );

  useEffect(() => {
    if (!open) return;
    setPickerValue(toPickerTimeValue(value));
  }, [open, value]);

  const handleConfirm = () => {
    onConfirm(toTimeString(pickerValue));
  };

  return (
    <AppDialog
      open={open}
      onOpenChange={onOpenChange}
      title="시간 선택"
      contentClassName="w-[293px] overflow-hidden"
    >
      <div className="flex flex-col justify-between pt-4">
        <div className="px-4">
          <Picker
            value={pickerValue}
            onChange={(nextValue) =>
              setPickerValue(nextValue as PickerTimeValue)
            }
            wheelMode="natural"
            itemHeight={52}
            height={156}
            className="flex items-start justify-center [&>div:last-child]:hidden"
          >
            <TimeWheelColumn name="period" options={PERIOD_OPTIONS} />
            <TimeWheelColumn name="hour" options={HOUR_OPTIONS} />
            <TimeWheelColumn name="minute" options={MINUTE_OPTIONS} />
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

export default TimeWheelDialog;
