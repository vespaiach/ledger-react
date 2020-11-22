import { makeStyles } from '@material-ui/core/styles';
import { blueGrey } from '@material-ui/core/colors';
import { styled } from '@material-ui/core/styles';
import {
    Table as OrginTable,
    TableCell as OrginTableCell,
    TableRow as OrginTableRow,
} from '@material-ui/core';

export const useTableStyles = makeStyles({
    row: {
        background: blueGrey[50],
    },
    cell: {
        borderColor: 'white',
    },
    boldRow: {
        background: blueGrey[100],
    },
});

export const Table = styled(OrginTable)({
    background: blueGrey[50],
});
export const TableCell = styled(OrginTableCell)(({ theme }) => ({
    borderColor: 'white',
    paddingLeft: theme.spacing(2),
    textAlign: 'left',
}));
export const TableBoldRow = styled(OrginTableRow)({
    background: blueGrey[100],
});
