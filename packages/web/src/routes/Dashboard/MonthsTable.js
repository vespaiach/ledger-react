import {
    Table,
    TableCell,
    TableHead,
    TableRow,
    TableBody,
} from '@material-ui/core';
import { useMemo } from 'react';
import currency from 'currency.js';

const months = [
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
export default function MonthsTable({
    expenses,
    incomes,
    direction = 'horizontal',
}) {
    const netSavings = useMemo(() => {
        const result = [];
        months.forEach((m, i) => {
            result.push(
                ((incomes[i + 1] || 0) - (expenses[i + 1] || 0)).toFixed(2)
            );
        });
        return result;
    }, [expenses, incomes]);

    return direction === 'horizontal' ? (
        <HorizontalMonthsTable
            expenses={expenses}
            incomes={incomes}
            netSavings={netSavings}
        />
    ) : (
        <VerticalMonthsTable
            expenses={expenses}
            incomes={incomes}
            netSavings={netSavings}
        />
    );
}

function HorizontalMonthsTable({ expenses, incomes, netSavings }) {
    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Month</TableCell>
                    {months.map((m) => (
                        <TableCell key={m}>{m}</TableCell>
                    ))}
                </TableRow>
            </TableHead>
            <TableBody>
                <TableRow>
                    <TableCell component="th">Expenses</TableCell>
                    {months.map((m, i) => (
                        <TableCell key={m}>
                            {currency(expenses[i + 1] || 0).format()}
                        </TableCell>
                    ))}
                </TableRow>
                <TableRow>
                    <TableCell component="th">Incomes</TableCell>
                    {months.map((m, i) => (
                        <TableCell key={m}>
                            {currency(incomes[i + 1] || 0).format()}
                        </TableCell>
                    ))}
                </TableRow>
                <TableRow>
                    <TableCell component="th">Net savings</TableCell>
                    {netSavings.map((row, i) => (
                        <TableCell key={i}>{currency(row).format()}</TableCell>
                    ))}
                </TableRow>
            </TableBody>
        </Table>
    );
}

function VerticalMonthsTable({ expenses, incomes, netSavings }) {
    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Month</TableCell>
                    <TableCell component="th">Expenses</TableCell>
                    <TableCell component="th">Incomes</TableCell>
                    <TableCell component="th">Net savings</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {months.map((m, i) => (
                    <TableRow>
                        <TableCell key={m}>{m}</TableCell>
                        <TableCell key={`expenses_${m}`}>
                            {currency(expenses[i + 1] || 0).format()}
                        </TableCell>
                        <TableCell key={`incomes_${m}`}>
                            {currency(incomes[i + 1] || 0).format()}
                        </TableCell>
                        <TableCell key={`netsavings_${m}`}>
                            {currency(netSavings[i] || 0).format()}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
