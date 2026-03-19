import { WEEK_DAYS_MON_FIRST, type WeekDay } from '@/constants/weekdays';
import {
  ruleCreateSchema,
  type RuleCreateValues,
} from '@/schemas/ruleCreateSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

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

export type RuleFormInitialValues = Partial<RuleFormSubmitValues>;
export type RuleFormMode = 'create' | 'edit';

type RuleSettings = {
  notiEnabled: boolean;
  timeSettingEnabled: boolean;
  repeatEnabled: boolean;
};

type RuleSettingKey = keyof RuleSettings;
type TimeField = 'startTime' | 'endTime';

const INITIAL_SETTINGS: RuleSettings = {
  notiEnabled: false,
  timeSettingEnabled: false,
  repeatEnabled: false,
};

const DEFAULT_TIME_RANGE = {
  startTime: '09:00:00',
  endTime: '12:00:00',
} as const;

// UI 선택 요일 배열 -> "1,3,5" 문자열
const toRepeatDays = (selectedDays: WeekDay[]) => {
  return WEEK_DAYS_MON_FIRST.reduce<string[]>((acc, day, index) => {
    if (selectedDays.includes(day)) {
      acc.push(String(index + 1));
    }

    return acc;
  }, []).join(',');
};

// "1,3,5" -> UI 선택 요일 배열
const parseRepeatDays = (repeatDays: string) => {
  if (!repeatDays.trim()) return [];

  return repeatDays
    .split(',')
    .map((day) => Number.parseInt(day, 10))
    .filter(
      (dayNumber) =>
        Number.isFinite(dayNumber) && dayNumber >= 1 && dayNumber <= 7
    )
    .map((dayNumber) => WEEK_DAYS_MON_FIRST[dayNumber - 1]);
};

const getInitialSettings = (
  initialValues?: RuleFormInitialValues
): RuleSettings => ({
  notiEnabled: initialValues?.notiEnabled ?? INITIAL_SETTINGS.notiEnabled,
  timeSettingEnabled:
    initialValues?.timeSettingEnabled ?? INITIAL_SETTINGS.timeSettingEnabled,
  repeatEnabled: initialValues?.repeatEnabled ?? INITIAL_SETTINGS.repeatEnabled,
});

const getInitialTimeRange = (initialValues?: RuleFormInitialValues) => ({
  startTime: initialValues?.startTime ?? DEFAULT_TIME_RANGE.startTime,
  endTime: initialValues?.endTime ?? DEFAULT_TIME_RANGE.endTime,
});

export const formatKoreanTime = (time: string) => {
  const [hourText, minuteText = '00'] = time.split(':');
  const hour = Number.parseInt(hourText, 10);
  const period = hour < 12 ? '오전' : '오후';
  const displayHour = hour % 12 === 0 ? 12 : hour % 12;

  return `${period} ${displayHour}:${minuteText}`;
};

type UseRuleFormModelParams = {
  initialValues?: RuleFormInitialValues;
  onSubmit: (values: RuleFormSubmitValues) => void;
};

export const useRuleFormModel = ({
  initialValues,
  onSubmit,
}: UseRuleFormModelParams) => {
  // 폼 외부 UI 상태(토글/시간 범위/선택 요일) 관리
  const [settings, setSettings] = useState<RuleSettings>(
    getInitialSettings(initialValues)
  );
  const [timeRange, setTimeRange] = useState(() =>
    getInitialTimeRange(initialValues)
  );
  const [activeTimeField, setActiveTimeField] = useState<TimeField | null>(
    null
  );
  const [selectedOperatingDays, setSelectedOperatingDays] = useState<WeekDay[]>(
    parseRepeatDays(initialValues?.repeatDays ?? '')
  );

  // 입력 필드 값 검증/제출 처리 전용 상태
  const { control, handleSubmit, formState } = useForm<RuleCreateValues>({
    resolver: zodResolver(ruleCreateSchema),
    mode: 'onChange',
    defaultValues: {
      title: initialValues?.title ?? '',
      memo: initialValues?.memo ?? '',
    },
  });

  const handleToggleSetting = (key: RuleSettingKey, checked: boolean) => {
    setSettings((prev) => {
      const next = {
        ...prev,
        [key]: checked,
      };

      // 알림 on -> 시간 설정도 on
      if (key === 'notiEnabled' && checked) {
        next.timeSettingEnabled = true;
      }

      return next;
    });
  };

  const handleConfirmTime = (time: string) => {
    if (!activeTimeField) return;

    setTimeRange((prev) => ({
      ...prev,
      [activeTimeField]: time,
    }));
    setActiveTimeField(null);
  };

  const handleFormSubmit = (data: RuleCreateValues) => {
    // 화면 상태와 RHF 입력값을 API 요청 스펙에 맞춰 결합
    onSubmit({
      title: data.title,
      memo: data.memo ?? '',
      notiEnabled: settings.notiEnabled,
      timeSettingEnabled: settings.timeSettingEnabled,
      repeatEnabled: settings.repeatEnabled,
      startTime: settings.timeSettingEnabled ? timeRange.startTime : null,
      endTime: settings.timeSettingEnabled ? timeRange.endTime : null,
      repeatDays: settings.repeatEnabled
        ? toRepeatDays(selectedOperatingDays)
        : '',
    });
  };

  return {
    // RuleForm에서 역할이 바로 보이도록 그룹화해서 반환
    form: {
      control,
      isValid: formState.isValid,
      submitForm: handleSubmit(handleFormSubmit),
    },
    state: {
      settings,
      timeRange,
      activeTimeField,
      selectedOperatingDays,
    },
    actions: {
      setSelectedOperatingDays,
      setActiveTimeField,
      handleToggleSetting,
      handleConfirmTime,
    },
  };
};
