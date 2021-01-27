import NumberFormat from 'react-number-format';
import { format } from 'date-fns';

export function formatCurrency(money, prefix) {
    return (
        <NumberFormat
            value={money}
            displayType={'text'}
            thousandSeparator={true}
            prefix={prefix}
            decimalScale={2}
            fixedDecimalScale={2}
        />
    );
}

export function getMonthName(m) {
    const months = [
        '',
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];
    return months[m];
}

export function formatLongDate(dt) {
    return format(new Date(dt), 'LLL do, yyyy HH:mm');
}

export function formatShortDate(dt) {
    return format(new Date(dt), 'MM/dd/yy HH:mm');
}
