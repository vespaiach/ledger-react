import { Grid, IconButton, Typography } from '@material-ui/core';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory, Link } from 'react-router-dom';
import { ArrowBack as ArrowBackIcon } from '@material-ui/icons';

import TransactionForm from '../../components/TransactionForm';
import ErrorAlert from '../../components/ErrorAlert';

const useStyles = makeStyles((theme) => ({
    boxPageTitle: {
        marginTop: theme.spacing(5),
        marginBottom: theme.spacing(3),
        display: 'flex',
        alignItems: 'center',
    },
    btnPreviousRoot: {
        marginRight: theme.spacing(2),
    },
    boxError: {
        marginTop: theme.spacing(3),
    },
}));

export default function IncomeForm() {
    const history = useHistory();
    const classes = useStyles();
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.inForm.categories);
    const status = useSelector((state) => state.inForm.status);
    const error = useSelector((state) => state.inForm.error);

    useEffect(() => {
        dispatch({ type: 'Saga: fetch incomes categories' });
    }, [dispatch]);

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
                        Add Income Transaction
                    </Typography>
                </div>
                <TransactionForm
                    categories={categories}
                    onCancel={() => history.push('/portal/incomes')}
                    onSubmit={(payload) => {
                        dispatch({ type: 'Saga: save income transation', payload });
                    }}
                    reset={status === 'done'}
                />
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
