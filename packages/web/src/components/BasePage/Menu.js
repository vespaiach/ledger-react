import { styled, withStyles } from '@material-ui/styles';
import { blueGrey, red } from '@material-ui/core/colors';
import { Link, useRouteMatch } from 'react-router-dom';
import clsx from 'clsx';

import PollIcon from '../Icons/Poll';
import TextBoxMinusIcon from '../Icons/TextBoxMinus';
import TextBoxPlusIcon from '../Icons/TextBoxPlus';

const Aside = styled('aside')(({ theme }) => ({
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'stretch',
    padding: theme.spacing(2),
    minHeight: '100vh',
    color: theme.palette.primary.main,
}));

const LinkTo = withStyles(({ palette, spacing }) => ({
    root: {
        display: 'flex',
        flexFlow: 'column nowrap',
        justifyContent: 'center',
        alignItems: 'center',
        textDecoration: 'none',
        color: 'inherit',
        '&:hover': {
            background: palette.action.hover,
        },
        width: spacing(12),
        height: spacing(10),
    },
    active: {
        color: palette.secondary.main,
        '& p': {
            display: 'block',
        },
    },
}))(({ classes, active, children, ...rest }) => (
    <Link
        {...rest}
        className={clsx(classes.root, { [classes.active]: active })}
    >
        {children}
    </Link>
));

const Text = styled('p')(({ theme }) => ({
    textTransform: 'uppercase',
    display: 'none',
    margin: `${theme.spacing(1)}px 0 0 0`,
    fontWeight: 500,
}));

export default function Menu({ collapse }) {
    const reportMatch = useRouteMatch({
        path: '/reports',
        strict: true,
    });
    const expensesMatch = useRouteMatch({
        path: '/expenses',
        strict: true,
    });
    const incomesMatch = useRouteMatch({
        path: '/incomes',
        strict: true,
    });

    return (
        <Aside>
            <LinkTo active={reportMatch} to="/reports">
                <PollIcon />
                <Text>Reports</Text>
            </LinkTo>
            <LinkTo active={expensesMatch} to="/expenses">
                <TextBoxMinusIcon />
                <Text>Expenses</Text>
            </LinkTo>
            <LinkTo active={incomesMatch} to="/incomes">
                <TextBoxPlusIcon />
                <Text>Incomes</Text>
            </LinkTo>
        </Aside>
    );
}
