import { makeStyles } from '@material-ui/core/styles';
import { Button, Container, Grid, Typography } from '@material-ui/core';
import { DeleteForeverRounded as DeleteForeverRoundedIcon } from '@material-ui/icons';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import TransactionList from '../../components/TransationList';
import { useCategories, useTransactions } from './hooks';
import DialogPanel from '../../components/DialogPanel';
import TransactionForm from '../../components/TransactionForm';
import TransDetails from './TransDetails';

const useStyles = makeStyles((theme) => ({
    gridRowRoot: {
        marginTop: theme.spacing(7),
    },
    formTitleRoot: {
        margin: theme.spacing(2, 0, 1, 0),
    },
    deletingConfirm: {
        display: 'flex',
        marginTop: theme.spacing(3),
    },
    deletingIcon: {
        width: 48,
        height: 48,
        marginRight: theme.spacing(2),
        color: theme.palette.warning.dark,
    },
    btns: {
        display: 'flex',
        marginTop: theme.spacing(3),
        '& button + button': {
            marginLeft: theme.spacing(3),
        },
    },
    btnDoit: {
        background: theme.palette.warning.dark,
    },
}));

const currentYear = new Date().getFullYear();

export default function Transactions({ year = currentYear }) {
    const classes = useStyles();
    const dispatch = useDispatch();

    const [editing, setEditing] = useState(null);
    const [deleting, setDeleting] = useState(null);
    const [detail, setDetail] = useState(null);

    const rawTransactions = useSelector((state) => state.transaction.list);
    const dateFrom = useSelector((state) => state.transaction.filter.dateFrom);
    const dateTo = useSelector((state) => state.transaction.filter.dateTo);
    const amountFrom = useSelector((state) => state.transaction.filter.amountFrom);
    const amountTo = useSelector((state) => state.transaction.filter.amountTo);
    const type = useSelector((state) => state.transaction.filter.type);

    /**
     * Transaction list after apply filtering
     */
    const filteredTransactions = useTransactions({
        data: rawTransactions,
        dateFrom,
        dateTo,
        amountFrom,
        amountTo,
        type,
    });
    const categories = useCategories({ data: rawTransactions });

    /**
     * Load transactions by year
     */
    useEffect(() => {
        dispatch({ type: 'Saga: fetch transactions', payload: year });
    }, [year, dispatch]);

    let el = null;
    if (editing) {
        el = (
            <>
                <Typography
                    color="primary"
                    variant="h6"
                    component="h2"
                    classes={{ root: classes.formTitleRoot }}>
                    {editing.id ? 'Edit Transaction' : 'Add Transaction'}
                </Typography>
                <TransactionForm
                    id={editing.id}
                    amount={editing.amount}
                    date={editing.date}
                    description={editing.description}
                    category={editing.category}
                    categories={categories}
                    onSubmit={(data) =>
                        dispatch({ type: 'Saga: sync transactions', payload: data })
                    }
                    onCancel={() => setEditing(null)}
                />
            </>
        );
    } else {
        el = (
            <TransactionList
                data={filteredTransactions}
                totalRows={filteredTransactions.length}
                onEdit={(item) => {
                    setEditing(item);
                }}
                onDelete={(item) => {
                    setDeleting(item);
                }}
                onDetail={(item) => {
                    setDetail(item);
                }}
            />
        );
    }

    return (
        <Container>
            <Grid container>
                <Grid item xs={12} classes={{ root: classes.gridRowRoot }}>
                    {el}
                    <DialogPanel
                        title="Confirmation"
                        open={Boolean(deleting)}
                        onClose={() => setDeleting(null)}>
                        <Container>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <div className={classes.deletingConfirm}>
                                        <DeleteForeverRoundedIcon
                                            classes={{ root: classes.deletingIcon }}
                                        />
                                        <Typography>
                                            Deleted transaction record won't be recovered. Do you
                                            want to continue?
                                        </Typography>
                                    </div>
                                    <div className={classes.btns}>
                                        <Button
                                            variant="contained"
                                            disableElevation
                                            fullWidth
                                            onClick={() => setDeleting(null)}>
                                            Cancel
                                        </Button>
                                        <Button
                                            variant="contained"
                                            classes={{ root: classes.btnDoit }}
                                            disableElevation
                                            fullWidth>
                                            Do It
                                        </Button>
                                    </div>
                                </Grid>
                            </Grid>
                        </Container>
                    </DialogPanel>
                    <TransDetails
                        detail={detail}
                        onClose={() => setDetail(null)}
                        onEdit={(item) => {
                            setDetail(null);
                            setEditing(item);
                        }}
                        onDelete={(item) => {
                            setDetail(null);
                            setDeleting(item);
                        }}
                    />
                </Grid>
            </Grid>
        </Container>
    );
}
