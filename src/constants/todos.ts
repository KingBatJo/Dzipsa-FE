export const TODO_TABS = {
  MY: 'my',
  HOUSE: 'house',
  COMPLETED: 'completed',
} as const;

export const TODO_STATUS = {
  PENDING: 'PENDING',
  COMPLETED: 'COMPLETED',
} as const;

export const TODO_RECURRING_TYPE = {
  NONE: 'NONE',
  WEEKLY: 'WEEKLY',
  MONTHLY: 'MONTHLY',
} as const;

export const REPEAT_TYPE_OPTIONS = ['매주', '매월'] as const;
