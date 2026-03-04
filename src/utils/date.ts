export function formatDueDate(date: string) {
  const d = new Date(date);

  const hours = d.getHours();
  const minutes = d.getMinutes();

  const period = hours < 12 ? '오전' : '오후';
  const displayHour = hours % 12 || 12;

  return `오늘 ${period} ${displayHour}:${minutes.toString().padStart(2, '0')}`;
}
