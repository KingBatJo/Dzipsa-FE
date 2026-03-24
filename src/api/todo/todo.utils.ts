import { TODO_RECURRING_TYPE, TODO_STATUS } from '@/constants/todos';
import { WEEK_DAYS_MON_FIRST } from '@/constants/weekdays';
import type {
  MyTodoListItem,
  TodoRecurringType,
  TodoStatus,
} from '@/api/todo/todo.types';
import { formatDueDateLabel, formatStatusDateLabel } from '@/utils/date';
import { formatRuleRepeatDays, parseRepeatDays } from '@/utils/ruleForm';

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

type TodoRepeatSource = Pick<MyTodoListItem, 'recurringType' | 'repeatDays'>;

export const getTodoRepeatLabel = (todo: TodoRepeatSource) => {
  if (todo.recurringType === TODO_RECURRING_TYPE.WEEKLY) {
    if (parseRepeatDays(todo.repeatDays ?? '').length === 0) return null;

    return formatRuleRepeatDays(todo.repeatDays, {
      joiner: '/',
      prefix: '',
      dailyLabel: '매일',
      emptyLabel: '',
    });
  }

  if (todo.recurringType === TODO_RECURRING_TYPE.MONTHLY) {
    const day = Number.parseInt(todo.repeatDays ?? '', 10);
    if (Number.isFinite(day) && day >= 1 && day <= 31) {
      return `매월 ${day}일`;
    }

    return '매월';
  }

  return null;
};

type TodoSubtitleSource = Pick<
  MyTodoListItem,
  'targetDate' | 'recurringType' | 'repeatDays'
>;

export const getTodoSubtitleInfo = (todo: TodoSubtitleSource) => {
  return {
    dueDateLabel: formatDueDateLabel(todo.targetDate),
    repeatLabel: getTodoRepeatLabel(todo),
  };
};
