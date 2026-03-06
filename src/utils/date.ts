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
  const [y, m, d] = date.split('-').map(Number);
  const [hh, mm] = time.split(':').map(Number);

  const local = new Date(y, m - 1, d, hh, mm, 0, 0);

  return local.toISOString();
};

// ISO (UTC) -> 'YYYY-MM-DD', 'HH:mm'
export const toLocalDateTime = (iso: string) => {
  const d = new Date(iso);

  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');

  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');

  return {
    date: `${year}-${month}-${day}`,
    time: `${hours}:${minutes}`,
  };
};
