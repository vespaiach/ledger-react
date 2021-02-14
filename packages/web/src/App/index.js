import { Snackbar, Container, IconButton, makeStyles } from '@material-ui/core';
import { Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CloseRounded as CloseRoundedIcon } from '@material-ui/icons';

import NotFound from '../routes/Errors/NotFound';
import MonthlyReport from '../routes/Reports';
import Transactions from '../routes/Transactions';
import DialogPanel from '../components/DialogPanel';
import Signin from '../routes/Signin';
import TopNav from './TopNav';

const useStyles = makeStyles((theme) => ({
    successSnackbar: {
        '& .MuiSnackbarContent-root': {
            background: theme.palette.success.main,
        },
    },
}));

function App() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const showSignIn = useSelector((state) => state.common.showSignIn);
    const appLoading = useSelector((state) => state.common.loading);
    const error = useSelector((state) => state.common.error);
    const success = useSelector((state) => state.common.success);
    const closeErrorMessage = () => dispatch({ type: 'Reducer: hide app error' });
    const closeSuccessMessage = () => dispatch({ type: 'Reducer: hide app success' });
    const handleSignOut = () => {
        dispatch({ type: 'Saga: sign out' });
    };

    return (
        <>
            <TopNav onSignOut={handleSignOut} />
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
                classes={{ root: classes.successSnackbar }}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                autoHideDuration={5000}
                open={Boolean(success)}
                action={
                    <IconButton
                        size="small"
                        aria-label="close"
                        color="inherit"
                        onClick={closeSuccessMessage}>
                        <CloseRoundedIcon fontSize="small" />
                    </IconButton>
                }
                message={success}
                onClose={closeSuccessMessage}
            />
            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                open={Boolean(error)}
                autoHideDuration={5000}
                action={
                    <IconButton
                        size="small"
                        aria-label="close"
                        color="inherit"
                        onClick={closeErrorMessage}>
                        <CloseRoundedIcon fontSize="small" />
                    </IconButton>
                }
                message={error}
                onClose={closeErrorMessage}
            />
            <Snackbar
                open={appLoading}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                message={
                    <>
                        <span>Loading transactions</span>
                        <div className="lds-ellipsis">
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
