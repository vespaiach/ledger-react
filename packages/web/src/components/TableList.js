import {
    TableRow,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableContainer,
    TableSortLabel,
    IconButton,
} from '@material-ui/core';
import { format } from 'date-fns';
import currency from 'currency.js';
import { FilterList as FilterListIcon } from '@material-ui/icons';

const columns = [
    {
        id: 'date',
        label: 'Date',
        format: (value) => format(new Date(value), 'LLL do, yyyy HH:mm'),
        sortable: true,
    },
    {
        id: 'amount',
        label: 'Amount',
        format: (value) => currency(value).format(),
        sortable: true,
    },
    {
        id: 'description',
        label: 'Description',
    },
    {
        id: 'category',
        label: 'Category',
        sortable: true,
    },
];

export default function TableList({
    orderBy,
    order,
    onSort,
    onFilterClick,
    hasFilter,
    rows = [],
}) {
    const createSortHandler = (col) => (e) => {
        e.preventDefault();
        if (onSort) {
            const field = col.id;
            let fieldOrder = 'asc';
            if (col.id === orderBy) {
                fieldOrder = order === 'asc' ? 'desc' : 'asc';
            }
            onSort({ field, order: fieldOrder });
        }
    };

    return (
        <>
            <TableContainer>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <IconButton
                                    aria-label="filter"
                                    size="small"
                                    onClick={onFilterClick}
                                    color={hasFilter ? 'secondary' : 'default'}
                                >
                                    <FilterListIcon />
                                </IconButton>
                            </TableCell>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.sortable ? (
                                        <TableSortLabel
                                            active={orderBy === column.id}
                                            direction={
                                                orderBy === column.id
                                                    ? order
                                                    : 'asc'
                                            }
                                            onClick={createSortHandler(column)}
                                        >
                                            {column.label}
                                        </TableSortLabel>
                                    ) : (
                                        column.label
                                    )}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => {
                            return (
                                <TableRow
                                    hover
                                    role="checkbox"
                                    tabIndex={-1}
                                    key={row.id}
                                >
                                    <TableCell></TableCell>
                                    {columns.map((column) => {
                                        const value = row[column.id];
                                        return (
                                            <TableCell
                                                key={column.id}
                                                align={column.align}
                                            >
                                                {column.format
                                                    ? column.format(value)
                                                    : value}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}
