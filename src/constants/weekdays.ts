export const WEEK_DAYS_MON_FIRST = [
  '월',
  '화',
  '수',
  '목',
  '금',
  '토',
  '일',
] as const;

export type WeekDay = (typeof WEEK_DAYS_MON_FIRST)[number];

export const WEEKDAY_LABELS_SUN_FIRST = ['일', ...WEEK_DAYS_MON_FIRST] as const;

export const DEFAULT_WEEK_DAY: WeekDay = '월';
