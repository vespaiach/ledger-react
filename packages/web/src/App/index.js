import { CircularProgress, Backdrop } from '@material-ui/core';
import { Redirect, Route, Switch, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/styles';

import Signin from '../routes/Signin';
import Recovery from '../routes/Recovery';
import NotFound from '../routes/Errors/NotFound';
import IncomeForm from '../routes/IncomeForm';
import IncomeList from '../routes/IncomeList';
import ExpenseForm from '../routes/ExpenseForm';
import ExpenseList from '../routes/ExpenseList';
import FlashMessage from '../components/FlashMessage';
import PrivatePageShell from './PrivatePageShell';
import ConfirmDialog from '../components/ConfirmDialog';
import { useState, useMemo } from 'react';
import SortDialog from '../components/SortDialog';
import useCounting from '../hooks/useCounting';
import SearchDialog from '../components/SearchingDialog';
import MonthlyReport from '../routes/MonthlyReport';

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

function App() {
    const dispatch = useDispatch();
    const location = useLocation();
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

    const incomeSorting = useSelector((state) => state.ins.sort);
    const incomeSearching = useSelector((state) => state.ins.search);
    const expenseSorting = useSelector((state) => state.exs.sort);
    const expenseSearching = useSelector((state) => state.exs.search);
    const {
        searchingCount,
        searching,
        sorting,
        onSortApply,
        onSearchApply,
        onSortReset,
        onSearchReset,
    } = useCounting({
        tabValue,
        incomeSearching,
        incomeSorting,
        expenseSearching,
        expenseSorting,
        dispatch,
    });
    const classes = useStyles();
    const loading = useSelector((state) => state.app.loading);
    const flashMessage = useSelector((state) => state.app.flashMessage);
    const flashMessageSeverity = useSelector((state) => state.app.flashMessageSeverity);
    const user = useSelector((state) => state.app.me);
    const confirm = useSelector((state) => state.app.confirm);
    const showConfirmDialog = useMemo(() => Boolean(confirm), [confirm]);
    const confirmObj = useMemo(() => confirm || {}, [confirm]);
    const [dialog, setDialog] = useState('');

    const handleClose = () => dispatch({ type: 'Reducer - app: clear flash message' });

    return (
        <>
            <Switch>
                <Route exact path="/signin">
                    <Signin />
                </Route>
                <Route exact path="/recovery">
                    <Recovery />
                </Route>
                <Route path="/portal">
                    <PrivatePageShell
                        userName={user && user.name}
                        userEmail={user && user.email}
                        tabValue={tabValue}
                        searchingCount={searchingCount}
                        onExit={() => dispatch({ type: 'Saga: signout' })}
                        onSearch={() => setDialog('search')}
                        onSort={() => setDialog('sort')}>
                        <Switch>
                            <Route
                                exact
                                path={['/portal/incomes/new', '/portal/incomes/:id(\\d+)']}>
                                <IncomeForm />
                            </Route>
                            <Route
                                exact
                                path={['/portal/expenses/new', '/portal/expenses/:id(\\d+)']}>
                                <ExpenseForm />
                            </Route>
                            <Route exact path="/portal/incomes">
                                <IncomeList />
                            </Route>
                            <Route exact path="/portal/expenses">
                                <ExpenseList />
                            </Route>
                            <Route exact path="/portal/monthly_reports">
                                <MonthlyReport />
                            </Route>
                            <Route>
                                <Redirect to="/portal/monthly_reports" />
                            </Route>
                        </Switch>
                    </PrivatePageShell>
                </Route>
                <Route exact path="/">
                    <Redirect to="/portal/incomes" />
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
                timeout={3000}
                onClose={handleClose}
            />
            <ConfirmDialog
                open={showConfirmDialog}
                title={confirmObj.title}
                message={confirmObj.message}
                type={confirmObj.type}
                onYes={() =>
                    dispatch({ type: confirmObj.payload.type, payload: confirmObj.payload.payload })
                }
                onNo={() => dispatch({ type: 'Reducer - app: clear confirm' })}
            />
            <SortDialog
                value={sorting}
                open={dialog === 'sort'}
                onClose={() => setDialog('')}
                onReset={() => {
                    onSortReset();
                    setDialog(null);
                }}
                onApply={(payload) => {
                    onSortApply(payload);
                    setDialog(null);
                }}
            />
            <SearchDialog
                onClose={() => setDialog('')}
                open={dialog === 'search'}
                dateFrom={searching.byDateFrom}
                dateTo={searching.byDateTo}
                amountFrom={searching.byAmountFrom}
                amountTo={searching.byAmountTo}
                category={searching.byCategory}
                onReset={() => {
                    onSearchReset();
                    setDialog(null);
                }}
                onApply={(payload) => {
                    onSearchApply(payload);
                    setDialog(null);
                }}
                categories={[]}
            />
        </>
    );
}

export default App;
