import { ListItemText, List, Avatar, ListItem, ListItemAvatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { AttachMoneyRounded as AttachMoneyRoundedIcon } from '@material-ui/icons';
import { useMemo } from 'react';
import NumberFormat from 'react-number-format';

const useStyles = makeStyles((theme) => ({
    boxChart: {
        display: 'flex',
    },
    boxIllustration: {
        flex: 1,
        display: 'flex',
    },
    boxLegend: {
        flex: 1,
        display: 'flex',
        flexFlow: 'column nowrap',
    },
    incomeBar: {
        flex: '0 0 42px',
        marginRight: theme.spacing(1),
        minHeight: 4,
        background: '#1BB9D6',
    },
    expenseBar: {
        flex: '0 0 42px',
        minHeight: 4,
        background: '#D6371B',
    },
    avatarRoot: {
        background: '#D6371B',
    },
}));

export default function Chart({ height, incomeTotal, expenseTotal }) {
    const classes = useStyles();
    const { incomeHeight, expenseHeight } = useMemo(() => {
        const max = incomeTotal > expenseTotal ? incomeTotal : expenseTotal;
        const iPercent = incomeTotal / max;
        const ePercent = expenseTotal / max;
        return {
            incomeHeight: Math.floor(height * iPercent),
            expenseHeight: Math.floor(height * ePercent),
        };
    }, [incomeTotal, expenseTotal, height]);

    return (
        <div className={classes.boxChart}>
            <div className={classes.boxIllustration}>
                <div className={classes.incomeBar} style={{ height: incomeHeight }} />
                <div className={classes.expenseBar} style={{ height: expenseHeight }} />
            </div>
            <div className={classes.boxLegend}>
                <List className={classes.root}>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar classes={{ root: classes.avatarRoot }}>
                                <AttachMoneyRoundedIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary={
                                <NumberFormat
                                    value={incomeTotal}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                />
                            }
                            secondary="Total incomes"
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar classes={{ root: classes.avatarRoot }}>
                                <AttachMoneyRoundedIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary={
                                <NumberFormat
                                    value={incomeTotal}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                />
                            }
                            secondary="Total expenses"
                        />
                    </ListItem>
                </List>
            </div>
        </div>
    );
}
