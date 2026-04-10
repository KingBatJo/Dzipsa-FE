import type { CreateRuleRequest } from '@/api/rule/rule.types';
import type { WeekDay } from '@/constants/weekdays';
import {
  ruleCreateSchema,
  type RuleCreateValues,
} from '@/schemas/ruleCreateSchema';
import {
  DEFAULT_RULE_TIME_RANGE,
  parseRepeatDays,
  toRepeatDays,
} from '@/utils/ruleForm';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export type RuleFormInitialValues = Partial<CreateRuleRequest>;
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

const getInitialSettings = (
  initialValues?: RuleFormInitialValues
): RuleSettings => ({
  notiEnabled: initialValues?.notiEnabled ?? INITIAL_SETTINGS.notiEnabled,
  timeSettingEnabled:
    initialValues?.timeSettingEnabled ?? INITIAL_SETTINGS.timeSettingEnabled,
  repeatEnabled: initialValues?.repeatEnabled ?? INITIAL_SETTINGS.repeatEnabled,
});

const getInitialTimeRange = (initialValues?: RuleFormInitialValues) => ({
  startTime: initialValues?.startTime ?? DEFAULT_RULE_TIME_RANGE.startTime,
  endTime: initialValues?.endTime ?? DEFAULT_RULE_TIME_RANGE.endTime,
});

type UseRuleFormModelParams = {
  initialValues?: RuleFormInitialValues;
  onSubmit: (values: CreateRuleRequest) => void | Promise<void>;
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

      // 시간 설정 off -> 알림도 off
      if (key === 'timeSettingEnabled' && !checked) {
        next.notiEnabled = false;
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

  const toNullableString = (value: string) => {
    const trimmed = value.trim();
    return trimmed.length > 0 ? trimmed : null;
  };

  // 화면 상태와 RHF 입력값을 API 요청 스펙에 맞춰 결합
  const handleFormSubmit = async (data: RuleCreateValues) => {
    await onSubmit({
      title: data.title.trim(),
      memo: toNullableString(data.memo ?? ''),
      notiEnabled: settings.notiEnabled,
      timeSettingEnabled: settings.timeSettingEnabled,
      repeatEnabled: settings.repeatEnabled,
      startTime: settings.timeSettingEnabled ? timeRange.startTime : null,
      endTime: settings.timeSettingEnabled ? timeRange.endTime : null,
      repeatDays: settings.repeatEnabled
        ? toNullableString(toRepeatDays(selectedOperatingDays))
        : null,
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
