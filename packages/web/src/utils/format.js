import currency from 'currency.js';
import { format } from 'date-fns';

export function formatCurrency(money) {
    return currency(money).format();
}

export function getMonthName(m) {
    const months = [
        '',
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
    ];
    return months[m];
}

export function formatLongDate(dt) {
    return format(new Date(dt), 'LLL do, yyyy HH:mm');
}

export function formatShortDate(dt) {
    return format(new Date(dt), 'MM/dd/yy HH:mm');
}