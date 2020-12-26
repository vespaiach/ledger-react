import { Container } from '@material-ui/core';
import { Switch, Route, Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Skeleton } from '@material-ui/lab';
import { useSelector, useDispatch } from 'react-redux';
import { useRef, useEffect } from 'react';

import Menu from './Menu';
import Expenses from '../routes/Expenses';
import Incomes from '../routes/Incomes';
import Dashboard from '../routes/Dashboard';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        minHeight: '100vh',
        alignItems: 'stretch',
    },
    content: {
        width: '100%',
        minHeight: '100vh',
        marginLeft: 132,
        background: theme.palette.background.paper,
        padding: `0 ${theme.spacing(4)}px ${theme.spacing(3)}px ${theme.spacing(4)}px `,
    },
}));

export default function BasePage() {
    const classes = useStyles();

    const verifyingAttempt = useRef(0);
    const id = useSelector((state) => state.me.id);
    const loading = useSelector((state) => state.me.loading);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!id && !loading && verifyingAttempt.current < 3) {
            dispatch({ type: 'Saga: verify login' });
            verifyingAttempt.current += 1;
        }
        if (verifyingAttempt.current >= 3) {
            dispatch({ type: 'Saga: force relogin' });
        }
    }, [id, loading, verifyingAttempt, dispatch]);

    return (
        <div className={classes.container}>
            <Menu />
            <Container maxWidth={false} component="main" classes={{ root: classes.content }}>
                {id && !loading ? (
                    <Switch>
                        <Route exact path="/portal/reports">
                            <Dashboard />
                        </Route>
                        <Route path="/portal/expenses">
                            <Expenses />
                        </Route>
                        <Route path="/portal/incomes">
                            <Incomes />
                        </Route>
                        <Route>
                            <Redirect to="/portal/reports" />
                        </Route>
                    </Switch>
                ) : (
                    <>
                        <Skeleton variant="text" style={{ marginTop: 24, marginBottom: 8 }} height={52} />
                        <Skeleton variant="rect" height={318} />
                    </>
                )}
            </Container>
        </div>
    );
}
