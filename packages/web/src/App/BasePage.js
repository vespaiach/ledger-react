import { Container } from '@material-ui/core';
import { Switch, Route } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

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

    return (
        <div className={classes.container}>
            <Menu />
            <Container maxWidth={false} component="main" classes={{ root: classes.content }}>
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
                </Switch>
            </Container>
        </div>
    );
}
