import { Snackbar, Container, IconButton } from '@material-ui/core';
import { Route, Switch, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import { CloseRounded as CloseRoundedIcon } from '@material-ui/icons';

import NotFound from '../routes/Errors/NotFound';
import { useMemo } from 'react';
import MonthlyReport from '../routes/MonthlyReport';
import Transactions from '../routes/Transactions';
import DialogPanel from '../components/DialogPanel';
import Signin from '../routes/Signin';
import TopNav from './TopNav';

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

function App() {
    const dispatch = useDispatch();
    const location = useLocation();
    const showSignIn = useSelector((state) => state.common.showSignIn);
    const appLoading = useSelector((state) => state.common.loading);
    const error = useSelector((state) => state.common.error);
    const closeMessage = () => dispatch({ type: 'Reducer: hide app error' });
    const tabValue = useMemo(() => {
        const tabIndex = {
            '/portal/incomes/new': 0,
            '/portal/incomes': 0,
            '/portal/expenses': 1,
            '/portal/expenses/new': 1,
            '/portal/monthly_reports': 2,
        };
        if (tabIndex[location.pathname] !== undefined) {
            return tabIndex[location.pathname];
        } else {
            if (/\/portal\/incomes\/\d+/gi.test(location.pathname)) {
                return 0;
            } else if (/\/portal\/expenses\/\d+/gi.test(location.pathname)) {
                return 1;
            }
        }
        return 2;
    }, [location.pathname]);

    return (
        <>
            <TopNav />
            <Switch>
                <Route exact path="/transactions">
                    <Transactions />
                </Route>
                <Route exact path="/reports">
                    <MonthlyReport />
                </Route>
                <Route path="*">
                    <NotFound />
                </Route>
            </Switch>
            <DialogPanel
                open={showSignIn}
                title="Sign In"
                onClose={() => dispatch({ type: 'Reducer: close sign in dialog' })}>
                <Container maxWidth="xs">
                    <Signin />
                </Container>
            </DialogPanel>
            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                open={Boolean(error)}
                autoHideDuration={5000}
                action={
                    <IconButton
                        size="small"
                        aria-label="close"
                        color="inherit"
                        onClick={closeMessage}>
                        <CloseRoundedIcon fontSize="small" />
                    </IconButton>
                }
                message={error}
                onClose={closeMessage}
            />
            <Snackbar
                open={appLoading}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                message={
                    <>
                        <span>Loading transactions</span>
                        <div class="lds-ellipsis">
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    </>
                }
            />
        </>
    );
}

export default App;
