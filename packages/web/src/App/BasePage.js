import { Container } from '@material-ui/core';
import { Switch, Route } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import Menu from './Menu';
import Expenses from '../routes/Expenses';
import ExpenseEdit from '../routes/Expenses/Edit';
import Dashboard from '../routes/Dashboard';
import ExpenseCreate from '../routes/Expenses/Create';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        minHeight: '100vh',
        alignItems: 'stretch',
    },
    content: {
        width: '100%',
        minHeight: '100vh',
        background: theme.palette.background.paper,
        paddingLeft: theme.spacing(8),
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
    },
}));

export default function BasePage() {
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <Menu />
            <Container
                maxWidth={false}
                component="main"
                classes={{ root: classes.content }}
            >
                <Switch>
                    <Route exact path="/portal/reports">
                        <Dashboard />
                    </Route>
                    <Route path="/portal/expenses">
                        <Expenses />
                    </Route>
                </Switch>
            </Container>
        </div>
    );
}
