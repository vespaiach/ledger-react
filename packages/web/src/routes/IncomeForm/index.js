import { Grid, IconButton, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory, Link, useParams } from 'react-router-dom';
import { ArrowBackRounded as ArrowBackIcon } from '@material-ui/icons';

import TransactionForm from '../../components/TransactionForm';
import ErrorAlert from '../../components/ErrorAlert';
import useLookupIcome from '../../hooks/useLookupIncome';

const useStyles = makeStyles((theme) => ({
    boxPageTitle: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        display: 'flex',
        alignItems: 'center',
    },
    btnPreviousRoot: {
        marginRight: theme.spacing(1),
    },
    boxError: {
        marginTop: theme.spacing(3),
    },
    boxSkeletonBtns: {
        display: 'flex',
        '& span:first-child': { flex: 1, marginRight: theme.spacing(4) },
        '& span:last-child': { flex: '0 0 136px' },
    },
}));

export default function IncomeForm() {
    const params = useParams();
    const history = useHistory();
    const classes = useStyles();
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.inForm.categories);
    const error = useSelector((state) => state.inForm.error);
    const { status, id, amount, description, date, category } = useLookupIcome(params.id);

    useEffect(() => {
        dispatch({ type: 'Saga: fetch incomes categories' });
    }, [dispatch]);

    let el = null;
    if (status === 'ok' || status === 'done') {
        el = (
            <TransactionForm
                id={id}
                date={date}
                amount={amount}
                category={category}
                description={description}
                categories={categories}
                onCancel={() => history.push('/portal/incomes')}
                onSubmit={(payload) => {
                    dispatch({ type: 'Saga: save income transation', payload });
                }}
                reset={status === 'done'}
            />
        );
    } else if (status === 'loading') {
        el = (
            <div>
                <Skeleton width="100%" height={58} />
                <Skeleton width="100%" height={58} />
                <Skeleton width="100%" height={58} />
                <Skeleton width="100%" height={118} />
                <div className={classes.boxSkeletonBtns}>
                    <Skeleton height={58} />
                    <Skeleton height={58} />
                </div>
            </div>
        );
    }

    return (
        <Grid container justify="center">
            <Grid item xs={12} sm={8} md={6} lg={5} xl={4}>
                <div className={classes.boxPageTitle}>
                    <IconButton
                        classes={{ root: classes.btnPreviousRoot }}
                        component={Link}
                        to="/portal/incomes"
                        edge="start"
                        title="go back to incomes listing page"
                        aria-label="go back to incomes listing page">
                        <ArrowBackIcon />
                    </IconButton>
                    <Typography variant="h5" component="h2">
                        {params.id ? 'Edit Income Transaction' : 'Add Income Transaction'}
                    </Typography>
                </div>
                {el}
                <ErrorAlert
                    open={Boolean(error)}
                    className={classes.boxError}
                    title={error && error.title}
                    onClose={() => dispatch({ type: 'Reducer - inForm: clear errors' })}>
                    {error ? error.messages.map((e) => <div key={e}>{e}</div>) : null}
                </ErrorAlert>
            </Grid>
        </Grid>
    );
}
