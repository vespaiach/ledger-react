import { useRouteMatch, useHistory } from 'react-router-dom';
import { makeStyles, List, ListItem, ListItemText } from '@material-ui/core';

import PollIcon from '../components/Icons/Poll';
import TextBoxMinusIcon from '../components/Icons/TextBoxMinus';
import TextBoxPlusIcon from '../components/Icons/TextBoxPlus';

const useStyles = makeStyles((theme) => ({
    aside: {
        paddingTop: theme.spacing(3),
        width: 132,
        height: '100vh',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 100,
        backgroundColor: 'rgba(0, 0, 0, 0.04)',
    },

    listItemButton: {
        width: 132,
        flexFlow: 'column nowrap',
        justifyContent: 'center',
        padding: `${theme.spacing(3)}px ${theme.spacing(2)}px`,
        '&:hover': {
            backgroundColor: theme.palette.background.paper,
        },
    },
    listItemSelected: {
        backgroundColor: theme.palette.background.paper,
        '&.Mui-selected': {
            '&:hover': {
                backgroundColor: theme.palette.background.paper,
            },
            backgroundColor: theme.palette.background.paper,
        },
    },
}));

export default function Menu() {
    const history = useHistory();
    const classes = useStyles();
    const reportMatch = useRouteMatch({
        path: '/portal/reports',
        strict: true,
    });
    const expensesMatch = useRouteMatch({
        path: '/portal/expenses',
        strict: true,
    });
    const incomesMatch = useRouteMatch({
        path: '/portal/incomes',
        strict: true,
    });
    const goto = (p) => () => history.push(p);

    return (
        <div className={classes.aside}>
            <List component="nav" aria-label="contacts">
                <ListItem
                    button
                    classes={{
                        button: classes.listItemButton,
                        selected: classes.listItemSelected,
                    }}
                    selected={reportMatch}
                    onClick={goto('/portal/reports')}
                >
                    <PollIcon />
                    <ListItemText primary="Reports" />
                </ListItem>
                <ListItem
                    button
                    classes={{
                        button: classes.listItemButton,
                        selected: classes.listItemSelected,
                    }}
                    selected={expensesMatch}
                    onClick={goto('/portal/expenses')}
                >
                    <TextBoxMinusIcon />
                    <ListItemText primary="Expenses" />
                </ListItem>
                <ListItem
                    button
                    classes={{
                        button: classes.listItemButton,
                        selected: classes.listItemSelected,
                    }}
                    selected={incomesMatch}
                    onClick={goto('/portal/incomes')}
                >
                    <TextBoxPlusIcon />
                    <ListItemText primary="Incomes" />
                </ListItem>
            </List>
        </div>
    );
}
