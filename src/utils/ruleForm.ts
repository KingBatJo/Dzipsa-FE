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
