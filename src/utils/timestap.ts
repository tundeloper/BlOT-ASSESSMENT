export function formatTime(timestamp: number): string {
  const date = new Date(timestamp * 1000);

  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: 'short',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  };

  const formatted = new Intl.DateTimeFormat('en-GB', options).format(date);
  const [dayMonth, time] = formatted.split(', ');

  return `${dayMonth.replace(',', '')} at ${time.toLowerCase()}`;
}