import EditableInputSection from '@/components/form/EditableInputSection';
import ErrorToolTip from '@/components/form/ErrorToolTip';
import FormPageLayout from '@/components/form/FormPageLayout';
import { WEEK_DAYS_MON_FIRST, type WeekDay } from '@/constants/weekdays';
import RuleSettingCard from '@/pages/rules/components/RuleSettingCard';
import { cn } from '@/lib/utils';
import {
  RULE_MEMO_MAX_LENGTH,
  RULE_TITLE_MAX_LENGTH,
  ruleCreateSchema,
  type RuleCreateValues,
} from '@/schemas/ruleCreateSchema';
import { validateTextMaxLength } from '@/utils/validators';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { WeekdaySelector } from '@/components/form/WeekdaySelector';

export type RuleFormSubmitValues = {
  title: string;
  memo: string;
  notiEnabled: boolean;
  timeSettingEnabled: boolean;
  repeatEnabled: boolean;
  startTime: string | null;
  endTime: string | null;
  repeatDays: string;
};

type RuleFormProps = {
  onSubmit: (values: RuleFormSubmitValues) => void;
};

type RuleSettings = {
  notiEnabled: boolean;
  timeSettingEnabled: boolean;
  repeatEnabled: boolean;
};

type RuleSettingKey = keyof RuleSettings;

const INITIAL_SETTINGS: RuleSettings = {
  notiEnabled: false,
  timeSettingEnabled: false,
  repeatEnabled: false,
};

const DEFAULT_TIME_RANGE = {
  startTime: '09:00:00',
  endTime: '12:00:00',
} as const;

const formatKoreanTime = (time: string) => {
  const [hourText, minuteText = '00'] = time.split(':');
  const hour = Number.parseInt(hourText, 10);
  const period = hour < 12 ? '오전' : '오후';
  const displayHour = hour % 12 === 0 ? 12 : hour % 12;

  return `${period} ${displayHour}:${minuteText}`;
};

const toRepeatDays = (selectedDays: WeekDay[]) => {
  return WEEK_DAYS_MON_FIRST.reduce<string[]>((acc, day, index) => {
    if (selectedDays.includes(day)) {
      acc.push(String(index + 1));
    }

    return acc;
  }, []).join(',');
};

const RuleForm = ({ onSubmit }: RuleFormProps) => {
  const [titleErrorMessage, setTitleErrorMessage] = useState('');
  const [memoErrorMessage, setMemoErrorMessage] = useState('');

  const [settings, setSettings] = useState<RuleSettings>(INITIAL_SETTINGS);
  const [selectedOperatingDays, setSelectedOperatingDays] = useState<WeekDay[]>(
    []
  );

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<RuleCreateValues>({
    resolver: zodResolver(ruleCreateSchema),
    mode: 'onChange',
    defaultValues: {
      title: '',
      memo: '',
    },
  });

  const handleToggleSetting = (key: RuleSettingKey, checked: boolean) => {
    setSettings((prev) => ({
      ...prev,
      [key]: checked,
    }));
  };

  const handleFormSubmit = (data: RuleCreateValues) => {
    onSubmit({
      title: data.title,
      memo: data.memo ?? '',
      notiEnabled: settings.notiEnabled,
      timeSettingEnabled: settings.timeSettingEnabled,
      repeatEnabled: settings.repeatEnabled,
      startTime: settings.timeSettingEnabled
        ? DEFAULT_TIME_RANGE.startTime
        : null,
      endTime: settings.timeSettingEnabled ? DEFAULT_TIME_RANGE.endTime : null,
      repeatDays: settings.repeatEnabled
        ? toRepeatDays(selectedOperatingDays)
        : '',
    });
  };

  return (
    <FormPageLayout
      title="규칙 등록"
      onSubmit={handleSubmit(handleFormSubmit)}
      submitDisabled={!isValid}
    >
      <div className="bg-zinc-100 pb-6">
        <div className="bg-white px-[15px] pt-[15px] pb-[30px]">
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <EditableInputSection
                id="rule-title"
                value={field.value}
                placeholder="규칙을 입력하세요"
                maxLength={RULE_TITLE_MAX_LENGTH}
                onChange={(value) => {
                  const maxLengthError = validateTextMaxLength(
                    value,
                    RULE_TITLE_MAX_LENGTH
                  );

                  if (maxLengthError) {
                    setTitleErrorMessage(maxLengthError);
                    return;
                  }

                  field.onChange(value);

                  if (titleErrorMessage) {
                    setTitleErrorMessage('');
                  }
                }}
                onBlur={() => {
                  field.onBlur();
                  setTitleErrorMessage('');
                }}
                errorMessage={titleErrorMessage || errors.title?.message}
                inputRef={field.ref}
              />
            )}
          />
        </div>

        <section className="flex flex-col gap-3 p-[15px]">
          <h2 className="text-sm font-semibold text-zinc-400">추가 설정</h2>

          <RuleSettingCard
            title="알람"
            checked={settings.notiEnabled}
            onToggle={(checked) => handleToggleSetting('notiEnabled', checked)}
            ariaLabel="알람 설정"
          />

          <RuleSettingCard
            title="규칙시간 설정하기"
            checked={settings.timeSettingEnabled}
            onToggle={(checked) =>
              handleToggleSetting('timeSettingEnabled', checked)
            }
            ariaLabel="규칙 시간 설정"
          >
            {settings.timeSettingEnabled && (
              <div className="flex items-end justify-between">
                <div className="flex flex-col gap-[7px]">
                  <p className="text-[11px] font-medium text-[#B7B7B7]">
                    시작 시간
                  </p>

                  <div className="border-border bg-secondary flex items-center rounded-[10px] border px-4 py-2">
                    <span className="text-muted-foreground text-lg font-semibold">
                      {formatKoreanTime(DEFAULT_TIME_RANGE.startTime)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-center p-2.5">
                  <ChevronRight className="text-muted-foreground h-6 w-6" />
                </div>

                <div className="flex flex-col gap-[7px]">
                  <p className="text-[11px] font-medium text-[#B7B7B7]">
                    종료 시간
                  </p>

                  <div className="border-border bg-secondary flex items-center rounded-[10px] border px-4 py-2">
                    <span className="text-muted-foreground text-lg font-semibold">
                      {formatKoreanTime(DEFAULT_TIME_RANGE.endTime)}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </RuleSettingCard>

          <RuleSettingCard
            title="운영 요일"
            checked={settings.repeatEnabled}
            onToggle={(checked) =>
              handleToggleSetting('repeatEnabled', checked)
            }
            ariaLabel="운영 요일 설정"
          >
            {settings.repeatEnabled && (
              <WeekdaySelector
                value={selectedOperatingDays}
                onChange={setSelectedOperatingDays}
              />
            )}
          </RuleSettingCard>

          <section className="flex flex-col gap-4 rounded-[20px] bg-white p-4">
            <p className="text-base font-semibold">메모</p>

            <Controller
              name="memo"
              control={control}
              render={({ field }) => (
                <ErrorToolTip
                  message={memoErrorMessage || errors.memo?.message}
                >
                  <div className="flex flex-col gap-2">
                    <textarea
                      id="rule-memo"
                      placeholder="메모를 입력하세요"
                      className={cn(
                        'h-[125px] w-full resize-none rounded-[12px] border bg-zinc-100 p-4 text-sm font-semibold outline-none placeholder:text-zinc-300',
                        memoErrorMessage || errors.memo?.message
                          ? 'border-red-500'
                          : 'border-zinc-200 focus:border-zinc-600'
                      )}
                      value={field.value}
                      onChange={(event) => {
                        const value = event.target.value;
                        const maxLengthError = validateTextMaxLength(
                          value,
                          RULE_MEMO_MAX_LENGTH
                        );

                        if (maxLengthError) {
                          setMemoErrorMessage(maxLengthError);
                          return;
                        }

                        field.onChange(value);

                        if (memoErrorMessage) {
                          setMemoErrorMessage('');
                        }
                      }}
                      onBlur={() => {
                        field.onBlur();
                        setMemoErrorMessage('');
                      }}
                      ref={field.ref}
                    />

                    <p className="flex justify-end text-xs font-medium text-zinc-400">
                      최대 {RULE_MEMO_MAX_LENGTH}자
                    </p>
                  </div>
                </ErrorToolTip>
              )}
            />
          </section>
        </section>
      </div>
    </FormPageLayout>
  );
};

export default RuleForm;
