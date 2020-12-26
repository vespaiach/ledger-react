import { makeStyles, Table, TableBody, TableCell, TableRow, Typography } from '@material-ui/core';
import { blueGrey } from '@material-ui/core/colors';
import { formatCurrency } from '../../utils/format';

const useStyles = makeStyles((theme) => ({
    rowRoot: {
        background: blueGrey[50],
    },
    cellTitleRoot: {
        borderColor: 'white',
        textTransform: 'capitalize',
    },
    cellRoot: {
        borderColor: 'white',
    },
    boldRowRoot: {
        background: blueGrey[100],
    },
    titleRoot: {
        marginBottom: theme.spacing(1),
        color: theme.palette.secondary.main,
    },
}));

export default function InMonthTable({ rows, title, tableRef }) {
    const classes = useStyles();
    const total = rows.reduce((a, i) => a + parseFloat(i.total), 0).toFixed(2);

    return (
        <>
            <Typography variant="h5" classes={{ root: classes.titleRoot }}>
                {title}
            </Typography>
            <Table size="small" ref={tableRef}>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.category} classes={{ root: classes.rowRoot }}>
                            <TableCell scope="row" classes={{ root: classes.cellTitleRoot }}>
                                {row.category}
                            </TableCell>
                            <TableCell align="right" classes={{ root: classes.cellRoot }}>
                                {formatCurrency(row.total)}
                            </TableCell>
                        </TableRow>
                    ))}
                    <TableRow classes={{ root: classes.boldRowRoot }}>
                        <TableCell classes={{ root: classes.cellRoot }}>Total</TableCell>
                        <TableCell align="right" classes={{ root: classes.cellRoot }}>
                            {formatCurrency(total)}
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </>
    );
}
