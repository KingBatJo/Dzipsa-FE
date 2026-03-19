import ToggleSwitch from '@/components/common/ToggleSwitch';
import EditableInputSection from '@/components/form/EditableInputSection';
import ErrorToolTip from '@/components/form/ErrorToolTip';
import FormPageLayout from '@/components/form/FormPageLayout';
import WeekdaySelector, {
  type WeekDay,
} from '@/components/form/WeekdaySelector';
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

type RuleFormSubmitValues = {
  title: string;
  memo: string;
  alarmEnabled: boolean;
  timeSettingEnabled: boolean;
  operatingDaysEnabled: boolean;
  startTime: string | null;
  endTime: string | null;
  operatingDays: WeekDay[];
};

type RuleSettingKey =
  | 'alarmEnabled'
  | 'timeSettingEnabled'
  | 'operatingDaysEnabled';

type RuleFormProps = {
  onSubmit: (values: RuleFormSubmitValues) => void;
};

const formatKoreanTime = (time: string) => {
  const [hourText, minuteText] = time.split(':');
  const hour = Number.parseInt(hourText, 10);
  const period = hour < 12 ? '오전' : '오후';
  const displayHour = hour % 12 === 0 ? 12 : hour % 12;

  return `${period} ${displayHour}:${minuteText}`;
};

const RuleForm = ({ onSubmit }: RuleFormProps) => {
  const [titleErrorMessage, setTitleErrorMessage] = useState('');
  const [memoErrorMessage, setMemoErrorMessage] = useState('');

  const [settings, setSettings] = useState<Record<RuleSettingKey, boolean>>({
    alarmEnabled: false,
    timeSettingEnabled: false,
    operatingDaysEnabled: false,
  });

  const [timeRange] = useState({
    startTime: '09:00',
    endTime: '09:00',
  });

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
      alarmEnabled: settings.alarmEnabled,
      timeSettingEnabled: settings.timeSettingEnabled,
      operatingDaysEnabled: settings.operatingDaysEnabled,
      startTime: settings.timeSettingEnabled ? timeRange.startTime : null,
      endTime: settings.timeSettingEnabled ? timeRange.endTime : null,
      operatingDays: settings.operatingDaysEnabled ? selectedOperatingDays : [],
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

          <section className="flex items-center justify-between rounded-[12px] bg-white p-4">
            <p className="text-base font-semibold text-black">알람</p>

            <ToggleSwitch
              checked={settings.alarmEnabled}
              onCheckedChange={(checked) =>
                handleToggleSetting('alarmEnabled', checked)
              }
              className={cn(
                settings.alarmEnabled ? undefined : 'bg-zinc-300',
                'disabled:opacity-100'
              )}
              ariaLabel="알람 설정"
            />
          </section>

          <section className="flex flex-col gap-2.5 rounded-[12px] bg-white p-4">
            <div className="flex items-center justify-between">
              <p className="text-base font-semibold text-black">
                규칙시간 설정하기
              </p>

              <ToggleSwitch
                checked={settings.timeSettingEnabled}
                onCheckedChange={(checked) =>
                  handleToggleSetting('timeSettingEnabled', checked)
                }
                className={cn(
                  settings.timeSettingEnabled ? undefined : 'bg-zinc-300',
                  'disabled:opacity-100'
                )}
                ariaLabel="규칙 시간 설정"
              />
            </div>

            {settings.timeSettingEnabled && (
              <div className="flex items-end justify-between">
                <div className="flex flex-col gap-[7px]">
                  <p className="text-[11px] font-medium text-[#B7B7B7]">
                    시작 시간
                  </p>

                  <div className="border-border bg-secondary flex items-center rounded-[10px] border px-4 py-2">
                    <span className="text-muted-foreground text-lg font-semibold">
                      {formatKoreanTime(timeRange.startTime)}
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
                      {formatKoreanTime(timeRange.endTime)}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </section>

          <section className="flex flex-col justify-between gap-3 rounded-[12px] bg-white p-4">
            <div className="flex items-center justify-between">
              <p className="text-base font-semibold text-black">운영 요일</p>

              <ToggleSwitch
                checked={settings.operatingDaysEnabled}
                onCheckedChange={(checked) =>
                  handleToggleSetting('operatingDaysEnabled', checked)
                }
                className={cn(
                  settings.operatingDaysEnabled ? undefined : 'bg-zinc-300',
                  'disabled:opacity-100'
                )}
                ariaLabel="운영 요일 설정"
              />
            </div>

            {settings.operatingDaysEnabled && (
              <WeekdaySelector
                value={selectedOperatingDays}
                onChange={setSelectedOperatingDays}
              />
            )}
          </section>

          <section className="flex flex-col gap-4 rounded-[18px] bg-white p-4">
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

export type { RuleFormSubmitValues };
export default RuleForm;
