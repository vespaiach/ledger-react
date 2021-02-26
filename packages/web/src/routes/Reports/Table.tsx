/**
 *
 * Ledger Web App Source Code.
 *
 * @license MIT
 * @copyright Toan Nguyen <nta.toan@gmail.com>
 *
 */
import {
    TableContainer,
    TableRow,
    TableCell,
    TableBody,
    TableHead,
    Table,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import { formatCurrency } from '../../utils/format';

const useStyles = makeStyles((theme) => ({
    headRow: {
        background: theme.palette.action.hover,
    },
}));

interface TransactionTableProps {
    className?: string;
    caption: string;
    transactions?: { name: string; total: number }[];
}

export default function TransactionTable({
    className,
    caption,
    transactions = [],
}: TransactionTableProps) {
    const classes = useStyles();
    return (
        <TableContainer className={className}>
            <Table aria-label="caption table">
                <caption>{caption}</caption>
                <TableHead>
                    <TableRow classes={{ head: classes.headRow }}>
                        <TableCell>Categories</TableCell>
                        <TableCell align="right">Amount ($)</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {transactions.map((row) => (
                        <TableRow key={row.name}>
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="right">{formatCurrency(row.total, null)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
