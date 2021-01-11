import {
    TableRow,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableContainer,
    TableSortLabel,
    IconButton,
    makeStyles,
} from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import { useEffect, useRef } from 'react';

import ImageFilterIcon from '../components/Icons/ImageFilter';
import ClipboardEditIcon from '../components/Icons/ClipboardEdit';
import CloseBoxIcon from '../components/Icons/CloseBox';
import { formatCurrency, formatLongDate } from '../utils/format';

const columns = [
    {
        id: 'date',
        label: 'Date',
        format: (value) => formatLongDate(value),
        sortable: true,
        styles: {
            paddingLeft: 4,
            minWidth: 120,
        },
    },
    {
        id: 'amount',
        label: 'Amount',
        format: (value) => formatCurrency(value),
        sortable: true,
        align: 'right',
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
    {
        id: '',
        label: ({ onClick, number, buttonRef }) => (
            <IconButton
                disableRipple
                size="small"
                style={{ color: 'white' }}
                onClick={onClick}
                ref={buttonRef}
            >
                <ImageFilterIcon title="Filter Transaction" number={number} />
            </IconButton>
        ),
        align: 'right',
        styles: {
            minWidth: 120,
        },
    },
];

const useStyles = makeStyles((theme) => ({
    tableCellHeader: {
        background: theme.palette.primary.main,
        color: `${theme.palette.background.paper} !important`,
    },
    tableCellHeaderIcon: {
        color: `${theme.palette.background.paper} !important`,
        '&:hover': {
            color: theme.palette.background.paper,
        },
    },
    tableCellHeaderLabel: {
        color: theme.palette.background.paper,
        '&:hover': {
            color: theme.palette.background.paper,
        },
    },
    paper: {
        marginTop: theme.spacing(2),
        marginLeft: -4,
    },
    button: {
        color: theme.palette.text.disabled,
    },
}));

export default function TableList({
    filterButtonRef,
    orderBy,
    rows = [],
    order,
    currentPage,
    totalPages,
    onSort,
    onEdit,
    onDelete,
    onPage,
    onFilter,
    numberOfFilter,
}) {
    const classes = useStyles();
    const containerRef = useRef(null);
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
    const handleAction = (name, record) => (e) => {
        e.preventDefault();
        if (name === 'edit' && onEdit) {
            onEdit(record);
        } else if (name === 'delete' && onDelete) {
            onDelete(record);
        }
    };
    const handleWindowResize = () => {
        containerRef.current.style.cssText = `max-height: ${
            window.innerHeight - 148
        }px`;
    };

    useEffect(() => {
        handleWindowResize();
        window.addEventListener('resize', handleWindowResize, {
            passive: true,
        });
        return () => {
            window.removeEventListener('resize', handleWindowResize, {
                passive: true,
            });
        };
    });

    return (
        <>
            <TableContainer ref={containerRef}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={column.styles}
                                    classes={{ root: classes.tableCellHeader }}
                                >
                                    {column.sortable ? (
                                        <TableSortLabel
                                            classes={{
                                                root:
                                                    classes.tableCellHeaderLabel,
                                                active: classes.tableCellHeader,
                                                icon: classes.tableCellHeader,
                                            }}
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
                                    ) : typeof column.label === 'function' ? (
                                        <column.label
                                            onClick={onFilter}
                                            number={numberOfFilter}
                                            buttonRef={filterButtonRef}
                                        />
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
                                    {columns.map((column) => {
                                        if (column.id) {
                                            const value = row[column.id];
                                            return (
                                                <TableCell
                                                    key={column.id}
                                                    align={column.align}
                                                    style={column.styles}
                                                >
                                                    {column.format
                                                        ? column.format(value)
                                                        : value}
                                                </TableCell>
                                            );
                                        }
                                        return (
                                            <TableCell
                                                key="control"
                                                align={column.align}
                                                style={column.styles}
                                            >
                                                <IconButton
                                                    size="small"
                                                    title="Edit Transaction"
                                                    classes={{
                                                        root: classes.button,
                                                    }}
                                                    onClick={handleAction(
                                                        'edit',
                                                        row
                                                    )}
                                                >
                                                    <ClipboardEditIcon title="Edit Transaction" />
                                                </IconButton>
                                                <IconButton
                                                    size="small"
                                                    edge="end"
                                                    title="Delete Transaction"
                                                    classes={{
                                                        root: classes.button,
                                                    }}
                                                    onClick={handleAction(
                                                        'delete',
                                                        row
                                                    )}
                                                    style={{ marginLeft: 8 }}
                                                >
                                                    <CloseBoxIcon title="Delete Transaction" />
                                                </IconButton>
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <div className={classes.paper}>
                <Pagination
                    count={totalPages}
                    onChange={onPage}
                    page={currentPage}
                    color="primary"
                    variant="outlined"
                    shape="rounded"
                />
            </div>
        </>
    );
}
