// 두 자리 숫자 문자열로 변환
const padTwo = (value: number) => value.toString().padStart(2, '0');

// Date 객체를 'YYYY.MM.DD' 형식 문자열로 변환
export const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = padTwo(date.getMonth() + 1);
  const day = padTwo(date.getDate());

  return `${year}.${month}.${day}`;
};

export const WEEKDAY_LABELS = [
  '일',
  '월',
  '화',
  '수',
  '목',
  '금',
  '토',
] as const;

export const formatDueDateLabel = (dateString: string) => {
  const date = new Date(dateString);

  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일까지`;
};

export const formatStatusDateLabel = (dateString: string) => {
  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = padTwo(date.getMonth() + 1);
  const day = padTwo(date.getDate());

  return `${year}.${month}.${day} (${WEEKDAY_LABELS[date.getDay()]})`;
};

// ISO datetime -> 오늘 오전 9:00
export const formatDueAt = (dueAt: string) => {
  const today = new Date();
  const target = new Date(dueAt);

  const hours = target.getHours();
  const minutes = target.getMinutes();

  const period = hours < 12 ? '오전' : '오후';
  const displayHour = hours % 12 || 12;

  const timeText = `${period} ${displayHour}:${minutes
    .toString()
    .padStart(2, '0')}`;

  const todayStart = new Date(today).setHours(0, 0, 0, 0);
  const targetStart = new Date(target).setHours(0, 0, 0, 0);

  const diff = Math.floor((targetStart - todayStart) / (1000 * 60 * 60 * 24));

  if (diff === -1) return `어제 ${timeText}`;
  if (diff === 0) return `오늘 ${timeText}`;
  if (diff === 1) return `내일 ${timeText}`;

  return `${target.getMonth() + 1}월 ${target.getDate()}일 ${timeText}`;
};

// 'YYYY-MM-DD', 'HH:mm' -> ISO (UTC)
export const toIsoDateTime = (date: string, time: string) => {
  const [year, month, day] = date.split('-').map(Number);
  const [hours, minutes] = time.split(':').map(Number);

  const localDateTime = new Date(year, month - 1, day, hours, minutes, 0, 0);

  return localDateTime.toISOString();
};

// ISO (UTC) -> 'YYYY-MM-DD', 'HH:mm'
export const toLocalDateTime = (iso: string) => {
  const date = new Date(iso);

  const year = date.getFullYear();
  const month = padTwo(date.getMonth() + 1);
  const day = padTwo(date.getDate());

  const hours = padTwo(date.getHours());
  const minutes = padTwo(date.getMinutes());

  return {
    date: `${year}-${month}-${day}`,
    time: `${hours}:${minutes}`,
  };
};
