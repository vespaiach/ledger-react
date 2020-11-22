import { TableHead, TableRow, TableBody } from '@material-ui/core';
import { useMemo } from 'react';

import { formatCurrency } from '../../utils/format';
import { Table, TableCell, TableBoldRow } from './styles';

const firstHalfMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
const secondHalfMonths = ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export default function MonthsTable({
    expenses,
    incomes,
    direction = 'horizontal',
}) {
    const firstHalfNetSavings = useMemo(() => {
        const result = [];
        firstHalfMonths.forEach((m, i) => {
            result.push(
                ((incomes[i + 1] || 0) - (expenses[i + 1] || 0)).toFixed(2)
            );
        });
        return result;
    }, [expenses, incomes]);

    const secondHalfNetSavings = useMemo(() => {
        const result = [];
        firstHalfMonths.forEach((m, i) => {
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
            firstHalfNetSavings={firstHalfNetSavings}
            secondHalfNetSavings={secondHalfNetSavings}
        />
    ) : (
        <VerticalMonthsTable
            expenses={expenses}
            incomes={incomes}
            firstHalfNetSavings={firstHalfNetSavings}
            secondHalfNetSavings={secondHalfNetSavings}
        />
    );
}

function HorizontalMonthsTable({
    expenses,
    incomes,
    firstHalfNetSavings,
    secondHalfNetSavings,
}) {
    return (
        <>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Month</TableCell>
                        {firstHalfMonths.map((m) => (
                            <TableCell key={m}>{m}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell>Expenses</TableCell>
                        {firstHalfMonths.map((m, i) => (
                            <TableCell key={m}>
                                {formatCurrency(expenses[i + 1] || 0)}
                            </TableCell>
                        ))}
                    </TableRow>
                    <TableRow>
                        <TableCell>Incomes</TableCell>
                        {firstHalfMonths.map((m, i) => (
                            <TableCell key={m}>
                                {formatCurrency(incomes[i + 1] || 0)}
                            </TableCell>
                        ))}
                    </TableRow>
                    <TableBoldRow>
                        <TableCell component="th">Net savings</TableCell>
                        {firstHalfNetSavings.map((row, i) => (
                            <TableCell key={i}>{formatCurrency(row)}</TableCell>
                        ))}
                    </TableBoldRow>
                </TableBody>
            </Table>
            <Table size="small">
                <TableBody>
                    <TableRow>
                        <TableCell>Month</TableCell>
                        {secondHalfMonths.map((m) => (
                            <TableCell key={m}>{m}</TableCell>
                        ))}
                    </TableRow>
                    <TableRow>
                        <TableCell>Expenses</TableCell>
                        {secondHalfMonths.map((m, i) => (
                            <TableCell key={m}>
                                {formatCurrency(expenses[i + 1] || 0)}
                            </TableCell>
                        ))}
                    </TableRow>
                    <TableRow>
                        <TableCell>Incomes</TableCell>
                        {secondHalfMonths.map((m, i) => (
                            <TableCell key={m}>
                                {formatCurrency(incomes[i + 1] || 0)}
                            </TableCell>
                        ))}
                    </TableRow>
                    <TableBoldRow>
                        <TableCell component="th">Net savings</TableCell>
                        {secondHalfNetSavings.map((row, i) => (
                            <TableCell key={i}>{formatCurrency(row)}</TableCell>
                        ))}
                    </TableBoldRow>
                </TableBody>
            </Table>
        </>
    );
}

function VerticalMonthsTable({
    expenses,
    incomes,
    firstHalfNetSavings,
    secondHalfNetSavings,
}) {
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
                {firstHalfMonths.map((m, i) => (
                    <TableRow>
                        <TableCell key={m}>{m}</TableCell>
                        <TableCell key={`expenses_${m}`}>
                            {formatCurrency(expenses[i + 1] || 0)}
                        </TableCell>
                        <TableCell key={`incomes_${m}`}>
                            {formatCurrency(incomes[i + 1] || 0)}
                        </TableCell>
                        <TableCell key={`netsavings_${m}`}>
                            {formatCurrency(firstHalfNetSavings[i] || 0)}
                        </TableCell>
                    </TableRow>
                ))}
                {secondHalfNetSavings.map((m, i) => (
                    <TableRow>
                        <TableCell key={m}>{m}</TableCell>
                        <TableCell key={`expenses_${m}`}>
                            {formatCurrency(expenses[i + 1] || 0)}
                        </TableCell>
                        <TableCell key={`incomes_${m}`}>
                            {formatCurrency(incomes[i + 1] || 0)}
                        </TableCell>
                        <TableCell key={`netsavings_${m}`}>
                            {formatCurrency(secondHalfNetSavings[i] || 0)}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}