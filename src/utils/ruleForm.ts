import { WEEK_DAYS_MON_FIRST, type WeekDay } from '@/constants/weekdays';

export const DEFAULT_RULE_TIME_RANGE = {
  startTime: '09:00:00',
  endTime: '12:00:00',
} as const;

// UI 선택 요일 배열 -> "1,3,5" 문자열
export const toRepeatDays = (selectedDays: WeekDay[]) => {
  return WEEK_DAYS_MON_FIRST.reduce<string[]>((acc, day, index) => {
    if (selectedDays.includes(day)) {
      acc.push(String(index + 1));
    }

    return acc;
  }, []).join(',');
};

// "1,3,5" -> UI 선택 요일 배열
export const parseRepeatDays = (repeatDays: string) => {
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

export const formatKoreanTime = (time: string) => {
  const [hourText, minuteText = '00'] = time.split(':');
  const hour = Number.parseInt(hourText, 10);
  const period = hour < 12 ? '오전' : '오후';
  const displayHour = hour % 12 === 0 ? 12 : hour % 12;

  return `${period} ${displayHour}:${minuteText}`;
};

type RuleTimeRangeFormatOptions = {
  separator?: string;
};

export const formatRuleTimeRange = (
  startTime: string | null | undefined,
  endTime: string | null | undefined,
  options?: RuleTimeRangeFormatOptions
) => {
  const { separator = ' > ' } = options ?? {};

  if (!startTime || !endTime) {
    return '-';
  }

  const formattedStartTime = formatKoreanTime(startTime);
  const formattedEndTime = formatKoreanTime(endTime);

  if (formattedStartTime === formattedEndTime) {
    return formattedStartTime;
  }

  return `${formattedStartTime}${separator}${formattedEndTime}`;
};

type RuleRepeatDaysFormatOptions = {
  joiner?: string;
  prefix?: string;
  dailyLabel?: string;
  emptyLabel?: string;
};

export const formatRuleRepeatDays = (
  repeatDays: string | null | undefined,
  options?: RuleRepeatDaysFormatOptions
) => {
  const {
    joiner = ', ',
    prefix = '매주 ',
    dailyLabel = '매일',
    emptyLabel = dailyLabel,
  } = options ?? {};
  const parsedRepeatDays = repeatDays ? parseRepeatDays(repeatDays) : [];

  if (parsedRepeatDays.length === 0) {
    return emptyLabel;
  }

  if (parsedRepeatDays.length === 7) {
    return dailyLabel;
  }

  return `${prefix}${parsedRepeatDays.join(joiner)}`;
};
