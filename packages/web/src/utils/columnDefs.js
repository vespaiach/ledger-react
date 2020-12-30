import { formatLongDate, formatCurrency } from './format';

const headerHeight = 60;
const rowHeight = 60;

export const desktopColDefs = [
    {
        label: 'Date',
        dataKey: 'date',
        align: 'left',
        rowHeight,
        headerHeight,
        width: 20, // percent
        format: formatLongDate,
    },
    {
        label: 'Amount',
        dataKey: 'amount',
        align: 'right',
        rowHeight,
        headerHeight,
        width: 18, // percent
        format: formatCurrency,
    },
    {
        label: 'Description',
        dataKey: 'description',
        align: 'left',
        rowHeight,
        headerHeight,
        width: 30, // percent
    },
    {
        label: 'Category',
        dataKey: 'category',
        align: 'left',
        rowHeight,
        headerHeight,
        width: 20, // percent
    },
    {
        label: '',
        dataKey: '2_buttons',
        align: 'right',
        rowHeight,
        headerHeight,
        width: 12, // percent
    },
];

export const mobileColDefs = [
    {
        label: 'Date',
        dataKey: 'date',
        align: 'left',
        rowHeight,
        headerHeight,
        width: 32, // percent
        format: formatLongDate,
    },
    {
        label: 'Amount',
        dataKey: 'amount',
        align: 'right',
        rowHeight,
        headerHeight,
        width: 28, // percent
        format: formatCurrency,
    },
    {
        label: 'Category',
        dataKey: 'category',
        align: 'left',
        rowHeight,
        headerHeight,
        width: 40, // percent
    },
];
