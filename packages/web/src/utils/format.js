import NumberFormat from 'react-number-format';
import { format } from 'date-fns';

export function formatCurrency(money) {
    return <NumberFormat value={money} displayType={'text'} thousandSeparator={true} prefix={'$'} />;
}

export function getMonthName(m) {
    const months = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months[m];
}

export function formatLongDate(dt) {
    return format(new Date(dt), 'LLL do, yyyy HH:mm');
}

export function formatShortDate(dt) {
    return format(new Date(dt), 'MM/dd/yy HH:mm');
}
