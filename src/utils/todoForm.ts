import type {
  RepeatValue,
  TodoCreateRequest,
  TodoFormValues,
} from '@/types/todo';

import { DEFAULT_WEEK_DAY } from '@/constants/weekdays';
import { formatDate } from '@/utils/date';

export const createDefaultRepeatValue = (): RepeatValue => ({
  enabled: false,
  type: '매주',
  days: [DEFAULT_WEEK_DAY],
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
          values.repeatValue.type === '매주' ? values.repeatValue.days : [],
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
