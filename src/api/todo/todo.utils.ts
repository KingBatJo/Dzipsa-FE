import { TODO_RECURRING_TYPE, TODO_STATUS } from '@/constants/todos';
import { WEEK_DAYS_MON_FIRST } from '@/constants/weekdays';
import type { TodoRecurringType, TodoStatus } from '@/api/todo/todo.types';
import { formatStatusDateLabel } from '@/utils/date';

export const getTodoRecurringInfoText = (
  recurringType?: TodoRecurringType,
  repeatDays?: string | null
) => {
  if (!recurringType || recurringType === TODO_RECURRING_TYPE.NONE) {
    return '설정 안 함';
  }

  if (recurringType === TODO_RECURRING_TYPE.WEEKLY) {
    if (!repeatDays) return '매주';

    const labels = repeatDays
      .split(',')
      .map((day) => day.trim())
      .map((day) => {
        const dayNumber = Number(day);
        if (!Number.isInteger(dayNumber) || dayNumber < 1 || dayNumber > 7) {
          return day;
        }
        return WEEK_DAYS_MON_FIRST[dayNumber - 1];
      })
      .join(', ');

    return `매주 ${labels}`;
  }

  if (!repeatDays) return '매월';

  return `매월 ${repeatDays}일`;
};

export const getTodoStatusTexts = (
  status?: TodoStatus,
  delayDays = 0,
  completedAt?: string | null
) => {
  const completedDateText = completedAt
    ? formatStatusDateLabel(completedAt)
    : '';

  if (status === TODO_STATUS.COMPLETED) {
    if (delayDays > 0) {
      return {
        label: '지연 완료',
        detail: completedDateText
          ? `${delayDays}일 지연, ${completedDateText}`
          : `${delayDays}일 지연`,
      };
    }

    return { label: '완료', detail: completedDateText };
  }

  if (delayDays > 0) return { label: '지연', detail: `${delayDays}일 지연` };

  return { label: '진행중', detail: '' };
};
