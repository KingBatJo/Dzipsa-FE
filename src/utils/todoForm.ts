import type {
  CreateTodoRequest,
  TodoRecurringType,
} from '@/api/todo/todo.types';
import type {
  RepeatValue,
  TodoCreateRequest,
  TodoFormValues,
} from '@/types/todo';
import { formatDate, toDateString } from '@/utils/date';

import { DEFAULT_WEEK_DAY } from '@/constants/weekdays';
import { REPEAT_TYPE_OPTIONS } from '@/constants/todos';
import { parseRepeatDays, toRepeatDays } from '@/utils/ruleForm';

const WEEKLY_REPEAT_TYPE = REPEAT_TYPE_OPTIONS[0];
const MONTHLY_REPEAT_TYPE = REPEAT_TYPE_OPTIONS[1];

export const createDefaultRepeatValue = (): RepeatValue => ({
  enabled: false,
  type: WEEKLY_REPEAT_TYPE,
  days: [DEFAULT_WEEK_DAY],
  monthlyDay: 1,
  startDate: new Date(),
  endDate: null,
});

export const toTodoRequestPayload = (values: TodoFormValues) => ({
  title: values.title,
  assigneeId: values.assigneeId,
  dueDate:
    !values.repeatValue.enabled && values.dueDate
      ? formatDate(values.dueDate)
      : '',
  isRepeat: values.repeatValue.enabled,
  repeatOption: values.repeatValue.enabled
    ? {
        type: values.repeatValue.type,
        dayOfWeeks:
          values.repeatValue.type === WEEKLY_REPEAT_TYPE
            ? values.repeatValue.days
            : [],
        startDate: formatDate(values.repeatValue.startDate),
        endDate: values.repeatValue.endDate
          ? formatDate(values.repeatValue.endDate)
          : '',
      }
    : null,
  memo: values.memo,
});

export const toTodoCreateRequest = (
  values: TodoFormValues,
  roomId: number
): TodoCreateRequest => ({
  ...toTodoRequestPayload(values),
  roomId,
});

// TodoFormValues를 서버 CreateTodoRequest 스펙으로 변환
export const toCreateTodoPayload = (
  values: TodoFormValues
): CreateTodoRequest => {
  const isRecurringEnabled = values.repeatValue.enabled;
  const recurringType: TodoRecurringType = !isRecurringEnabled
    ? 'NONE'
    : values.repeatValue.type === WEEKLY_REPEAT_TYPE
      ? 'WEEKLY'
      : 'MONTHLY';

  const repeatDays = !isRecurringEnabled
    ? null
    : recurringType === 'WEEKLY'
      ? toRepeatDays(values.repeatValue.days)
      : `${values.repeatValue.monthlyDay}`;

  return {
    title: values.title,
    targetDate: toDateString(values.dueDate),
    recurringType,
    repeatDays,
    startDate: isRecurringEnabled
      ? toDateString(values.repeatValue.startDate)
      : null,
    endDate: isRecurringEnabled
      ? toDateString(values.repeatValue.endDate)
      : null,
    assigneeId: values.assigneeId,
    isRandom: values.isRandom,
    memo: values.memo || null,
  };
};

type RepeatPrefillSource = {
  recurringType: TodoRecurringType;
  repeatDays: string | null;
  startDate: string | null;
  endDate: string | null;
};

export const toPrefilledRepeatValue = ({
  recurringType,
  repeatDays,
  startDate,
  endDate,
}: RepeatPrefillSource): RepeatValue => {
  const defaultValue = createDefaultRepeatValue();

  if (recurringType === 'NONE') {
    return defaultValue;
  }

  const resolvedStartDate = startDate ? new Date(startDate) : new Date();
  const resolvedEndDate = endDate ? new Date(endDate) : null;

  if (recurringType === 'WEEKLY') {
    const parsedDays = repeatDays ? parseRepeatDays(repeatDays) : [];

    return {
      enabled: true,
      type: WEEKLY_REPEAT_TYPE,
      days: parsedDays.length > 0 ? parsedDays : [DEFAULT_WEEK_DAY],
      monthlyDay: 1,
      startDate: resolvedStartDate,
      endDate: resolvedEndDate,
    };
  }

  const parsedMonthlyDay = repeatDays ? Number.parseInt(repeatDays, 10) : NaN;
  const monthlyDay =
    Number.isFinite(parsedMonthlyDay) && parsedMonthlyDay >= 1 && parsedMonthlyDay <= 31
      ? parsedMonthlyDay
      : 1;

  return {
    enabled: true,
    type: MONTHLY_REPEAT_TYPE,
    days: [DEFAULT_WEEK_DAY],
    monthlyDay,
    startDate: resolvedStartDate,
    endDate: resolvedEndDate,
  };
};
