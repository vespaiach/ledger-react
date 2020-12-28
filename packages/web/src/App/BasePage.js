import { CircularProgress, Container } from '@material-ui/core';
import { Switch, Route, Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
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
    loading: {
        backgound: 'white',
        width: '100%',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
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
            <Container maxWidth={false} component="main" classes={{ root: classes.content }}>
                {id && !loading ? (
                    <>
                        <Menu />
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
                    </>
                ) : (
                    <div className={classes.loading}>
                        <CircularProgress disableShrink />
                    </div>
                )}
            </Container>
        </div>
    );
}
