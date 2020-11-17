import { Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CssBaseline } from '@material-ui/core';
import LoadingBar from 'react-redux-loading-bar';

import APIErrorModal from './components/APIErrorModal';
import Login from './routes/User/Login';
import ExpenseList from './routes/Expenses/List';
import PrivateRoute from './components/PrivateRoute';

function App() {
    const apiError = useSelector((state) => state.common.apiError);
    const dispatch = useDispatch();
    const close = () => dispatch({ type: 'CLEAR_API_ERROR' });

    return (
        <>
            <header>
                <LoadingBar />
            </header>

            <CssBaseline />
            <APIErrorModal
                code={apiError ? apiError.code : null}
                messages={apiError ? apiError.messages : []}
                open={apiError !== null}
                onClose={close}
            ></APIErrorModal>

            <Switch>
                <PrivateRoute exact path="/expenses">
                    <ExpenseList />
                </PrivateRoute>
                <Route exact path="/login">
                    <Login />
                </Route>
            </Switch>
        </>
    );
}

export default App;
