import { CircularProgress, Backdrop } from '@material-ui/core';
import { Redirect, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/styles';

import Signup from '../routes/Signup';
import Signin from '../routes/Signin';
import Recovery from '../routes/Recovery';
import NotFound from '../routes/Errors/NotFound';
import FlashMessage from '../components/FlashMessage';
import IncomeList from '../routes/IncomeList';
import PrivatePageShell from '../components/PrivatePageShell';

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

function App() {
    const dispatch = useDispatch();
    const classes = useStyles();
    const loading = useSelector((state) => state.app.loading);
    const flashMessage = useSelector((state) => state.app.flashMessage);
    const flashMessageSeverity = useSelector((state) => state.app.flashMessageSeverity);

    const handleClose = () => dispatch({ type: 'Reducer - app: clear flash message' });

    return (
        <>
            <Switch>
                <Route exact path="/incomes">
                    <IncomeList />
                </Route>
                <Route exact path="/signin">
                    <Signin />
                </Route>
                <Route exact path="/signup">
                    <Signup />
                </Route>
                <Route exact path="/recovery">
                    <Recovery />
                </Route>
                <Route path="/portal">
                    <PrivatePageShell>
                        <Switch>
                            <Route path="/portal/incomes">
                                <IncomeList />
                            </Route>
                            <Route>
                                <Redirect to="/portal/reports" />
                            </Route>
                        </Switch>
                    </PrivatePageShell>
                </Route>
                <Route exact path="/">
                    <Redirect to="/portal/reports" />
                </Route>
                <Route path="*">
                    <NotFound />
                </Route>
            </Switch>
            <Backdrop className={classes.backdrop} open={loading}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <FlashMessage
                open={Boolean(flashMessage)}
                message={flashMessage}
                severity={flashMessageSeverity}
                timeout={400000}
                onClose={handleClose}
            />
        </>
    );
}

export default App;
