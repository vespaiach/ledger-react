import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from '@material-ui/core';


export default function TotalList({ rows }) {
    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Category</TableCell>
                    <TableCell align="right">Total</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {rows.map((row) => (
                    <TableRow key={row.category}>
                        <TableCell component="th" scope="row">
                            {row.category}
                        </TableCell>
                        <TableCell align="right">{row.total}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
