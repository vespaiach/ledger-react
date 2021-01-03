import { CircularProgress, Container } from '@material-ui/core';
import { Switch, Route, Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import { useRef, useEffect } from 'react';

import SideMenu from './SideMenu';
import Expenses from '../routes/Expenses';
import Incomes from '../routes/Incomes';
import Dashboard from '../routes/Dashboard';
import BottomMenu from './BottomMenu';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        minHeight: '100vh',
        alignItems: 'stretch',
        [theme.breakpoints.down('sm')]: {
            padding: 0,
            flexFlow: 'column nowrap',
        },
    },
    sideMenu: {
        display: 'block',
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
    },
    botMenu: {
        display: 'none',
        [theme.breakpoints.down('sm')]: {
            display: 'flex',
        },
    },
    content: {
        width: '100%',
        minHeight: '100vh',
        padding: `0 ${theme.spacing(3)}px ${theme.spacing(3)}px ${theme.spacing(3)}px `,
        marginLeft: 132,
        [theme.breakpoints.down('sm')]: {
            marginLeft: 0,
            padding: `0 ${theme.spacing(3)}px 72px ${theme.spacing(3)}px`,
        },
        background: theme.palette.background.paper,
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

export default function BaseAppPage() {
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

    if (loading || !id) {
        return (
            <div className={classes.loading}>
                <CircularProgress disableShrink />
            </div>
        );
    }

    return (
        <div className={classes.container}>
            <Container maxWidth={false} component="main" classes={{ root: classes.content }}>
                <SideMenu className={classes.sideMenu} />
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
            </Container>
            <BottomMenu className={classes.botMenu} />
        </div>
    );
}
