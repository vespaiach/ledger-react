import { Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CssBaseline } from '@material-ui/core';
import LoadingBar from 'react-redux-loading-bar';

import APIErrorModal from './components/APIErrorModal';
import Login from './routes/User/Login';
import ExpenseList from './routes/Expenses/List';
import ExpenseEdit from './routes/Expenses/Edit';
import Dashboard from './routes/Dashboard';
import ExpenseCreate from './routes/Expenses/Create';
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
                <PrivateRoute exact path="/">
                    <Dashboard />
                </PrivateRoute>
                <PrivateRoute exact path="/expenses">
                    <ExpenseList />
                </PrivateRoute>
                <PrivateRoute exact path="/expenses/new">
                    <ExpenseCreate />
                </PrivateRoute>
                <PrivateRoute exact path="/expenses/:id">
                    <ExpenseEdit />
                </PrivateRoute>
                <Route exact path="/login">
                    <Login />
                </Route>
            </Switch>
        </>
    );
}

export default App;
