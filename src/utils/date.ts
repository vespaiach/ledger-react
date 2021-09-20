const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Now', 'Dec'];
const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

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

export function formatShortDateTime(dt?: Date) {
  if (!dt) {
    return '';
  }
  return `${days[dt.getDay()]}, ${months[dt.getMonth()]} ${dt
    .getDate()
    .toString()
    .padStart(2, '0')} ${dt.getFullYear()} ${dt.getHours().toString().padStart(2, '0')}:${dt
    .getMinutes()
    .toString()
    .padStart(2, '0')}`;
}
