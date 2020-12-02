import { useRouteMatch, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import clsx from 'clsx';

import PollIcon from '../components/Icons/Poll';
import TextBoxMinusIcon from '../components/Icons/TextBoxMinus';
import TextBoxPlusIcon from '../components/Icons/TextBoxPlus';
import MenuItem from './MenuItem';
import PlusOne from '../components/Icons/PlusOne';

const useStyle = makeStyles((theme) => ({
    aside: {
        display: 'block',
        padding: theme.spacing(3),
        minHeight: '100vh',
        color: theme.palette.primary.main,
    },
    menuGroup: {
        '& > div:not(:first-child)': {
            height: 0,
            visibility: 'hidden',
        },
        '&.active': {
            border: '1px solid',
            borderRadius: 4,
            '& > div:not(:first-child)': {
                height: 88,
                visibility: 'visible',
            },
        },
    },
    visibleItem: {
        flex: 1,
    },
    collapseItem: {
        flex: 0,
        height: 'auto',
        overflow: 'hidden',
    },
}));

export default function Menu() {
    const history = useHistory();
    const classes = useStyle();
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
            <div className={clsx(classes.menuGroup, { active: reportMatch })}>
                <MenuItem
                    title="Reports"
                    Icon={PollIcon}
                    onClick={goto('/portal/reports')}
                    active={reportMatch}
                />
            </div>

            <div className={clsx(classes.menuGroup, { active: expensesMatch })}>
                <MenuItem
                    title="Expenses"
                    Icon={TextBoxMinusIcon}
                    onClick={goto('/portal/expenses')}
                    active={expensesMatch}
                    className={classes.visibleItem}
                />
                <MenuItem
                    title="Add new Transaction"
                    Icon={PlusOne}
                    onClick={goto('/portal/expenses/new')}
                    active={expensesMatch}
                    className={classes.visibleItem}
                    subMenuItem
                />
            </div>

            <div className={clsx(classes.menuGroup, { active: incomesMatch })}>
                <MenuItem
                    title="Incomes"
                    Icon={TextBoxPlusIcon}
                    onClick={goto('/portal/incomes')}
                    active={incomesMatch}
                />
                <MenuItem
                    title="Add new Transaction"
                    Icon={PlusOne}
                    onClick={goto('/portal/incomes/new')}
                    active={incomesMatch}
                    className={classes.visibleItem}
                    subMenuItem
                />
            </div>
        </div>
    );
}
