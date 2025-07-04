export default function formatTime(time: string): string {
  const date = new Date(time);
  if (isNaN(date.getTime())) return "Invalid date";

  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "short" });
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "pm" : "am";

  hours = hours % 12;
  hours = hours ? hours : 12; // 0 => 12

  return `${day} ${month} at ${hours}:${minutes}${ampm}`;
}