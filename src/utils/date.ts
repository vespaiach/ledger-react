const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Now', 'Dec'];

export function formatDateTime(dt?: Date) {
  if (!dt) {
    return '';
  }
  return `${months[dt.getMonth()]} ${dt
    .getDate()
    .toString()
    .padStart(2, '0')}, ${dt.getFullYear()} ${dt.getHours().toString().padStart(2, '0')}:${dt
    .getMinutes()
    .toString()
    .padStart(2, '0')}`;
}
