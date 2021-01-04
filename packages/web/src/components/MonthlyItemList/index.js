import { useContext, useMemo } from 'react';
import clsx from 'clsx';
import { ListSubheader, List, ListItem, ListItemText, makeStyles, Box } from '@material-ui/core';

import { CurrencyFormatContext } from '../../App/AppContext';

const useStyles = makeStyles((theme) => ({
    textRoot: {
        flex: '1',
    },
    secondaryText: {
        color: theme.palette.primary.contrastText,
    },
    subHeadText: {
        fontStyle: 'italic',
    },
}));

export default function MonthlyList({ title, items, ...other }) {
    const classes = useStyles();
    const total = useMemo(() => items.reduce((a, i) => (a += i.amount), 0), [items]);
    const formatCurrency = useContext(CurrencyFormatContext);

    return (
        <Box {...other} bgcolor="primary.light" color="text.secondary">
            <List component="ul" aria-label="List of expenses/incomes in month">
                <ListSubheader disableGutters color="inherit">
                    <ListItemText primary={title} color="inherit" />
                </ListSubheader>
                <ListItem dense disableGutters divider>
                    <ListItemText primary="Total" classes={{ root: clsx(classes.subHeadText, classes.textRoot) }} />
                    <ListItemText
                        secondary={formatCurrency(total)}
                        classes={{
                            root: classes.textRoot,
                            secondary: clsx(classes.subHeadText, classes.secondaryText),
                        }}
                    />
                </ListItem>
                {items.map((it, i) => (
                    <ListItem dense disableGutters divider={i < items.length - 1} key={i}>
                        <ListItemText primary={it.caption} classes={{ root: classes.textRoot }} />
                        <ListItemText
                            secondary={it.amount}
                            classes={{ root: classes.textRoot, secondary: classes.secondaryText }}
                        />
                    </ListItem>
                ))}
            </List>
        </Box>
    );
}
