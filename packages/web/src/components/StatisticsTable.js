import { makeStyles } from '@material-ui/core/styles';
import { blueGrey } from '@material-ui/core/colors';
import { styled } from '@material-ui/core/styles';
import {
    Table as OrginTable,
    TableBody,
    TableCell as OrginTableCell,
    TableRow,
} from '@material-ui/core';

export const Table = styled(OrginTable)({
    background: blueGrey[50],
});
export const TableCell = styled(OrginTableCell)(({ theme }) => ({
    borderColor: 'white',
    paddingLeft: theme.spacing(2),
    textAlign: 'left',
}));
export const TableBoldRow = styled(TableRow)({
    background: blueGrey[100],
});

export default function StatisticsTable({ rows }) {
    return (
        <Table>
            <TableBody>
                {rows.map((row, i) => (
                    <TableRow key={i}>
                        {row.map((cell, j) => (
                            <TableCell
                                key={`${i},${j}`}
                                component={cell.component || 'td'}
                            >
                                {cell.value}
                            </TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
