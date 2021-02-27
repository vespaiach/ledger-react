/**
 *
 * Ledger Web App Source Code.
 *
 * @license MIT
 * @copyright Toan Nguyen <nta.toan@gmail.com>
 *
 */
import { ListItemText, List, ListItem, ListItemIcon, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
    TurnedInRounded as TurnedInRoundedIcon,
    AddRounded as AddRoundedIcon,
    RemoveRounded as RemoveRoundedIcon,
} from '@material-ui/icons';
import { useMemo } from 'react';
import FormatCurrency from '../../components/FormatCurrency';

const useStyles = makeStyles((theme) => ({
    boxChart: {
        display: 'flex',
    },
    boxIllustration: {
        flex: '0 0 136px',
        display: 'flex',
        alignItems: 'flex-end',
    },
    boxLegend: {
        flexGrow: 1,
        display: 'flex',
        flexFlow: 'column nowrap',
        justifyContent: 'center',
        alignItems: 'center',
        '& .MuiList-root.MuiList-padding': {
            padding: 0,
        },
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
    itemRoot: {
        alignItems: 'flex-start',
        '& .MuiListItemText-root.MuiListItemText-multiline ': {
            margin: 0,
        },
    },
    incomeAvatarRoot: {
        color: '#1bb9d6',
        minWidth: 32,
        marginTop: 2,
    },
    expenseAvatarRoot: {
        color: '#D6371B',
        minWidth: 32,
        marginTop: 2,
    },
    boxGrow: {
        flexGrow: 1,
    },
}));

interface ChartProps {
    height: number;
    incomeTotal: number;
    expenseTotal: number;
}

export default function Chart({ height, incomeTotal, expenseTotal }: ChartProps) {
    const classes = useStyles();
    const { incomeHeight, expenseHeight } = useMemo(() => {
        const max = incomeTotal > expenseTotal ? incomeTotal : expenseTotal;
        const iPercent = incomeTotal / max;
        const ePercent = expenseTotal / max;
        return {
            incomeHeight: iPercent ? Math.floor(height * iPercent) : 0,
            expenseHeight: ePercent ? Math.floor(height * ePercent) : 0,
        };
    }, [incomeTotal, expenseTotal, height]);

    return (
        <div className={classes.boxChart}>
            <div className={classes.boxIllustration}>
                <div className={classes.incomeBar} style={{ height: incomeHeight }} />
                <div className={classes.expenseBar} style={{ height: expenseHeight }} />
            </div>
            <div className={classes.boxLegend}>
                <List component="div">
                    <ListItem component="div" classes={{ root: classes.itemRoot }}>
                        <ListItemIcon classes={{ root: classes.incomeAvatarRoot }}>
                            <TurnedInRoundedIcon />
                        </ListItemIcon>
                        <ListItemText
                            primary={<FormatCurrency money={incomeTotal} />}
                            secondary="Incomes"
                        />
                    </ListItem>
                    <ListItem component="div" classes={{ root: classes.itemRoot }}>
                        <ListItemIcon classes={{ root: classes.expenseAvatarRoot }}>
                            <TurnedInRoundedIcon />
                        </ListItemIcon>
                        <ListItemText
                            primary={<FormatCurrency money={expenseTotal} />}
                            secondary="Expenses"
                        />
                    </ListItem>
                    <Divider />
                    <ListItem component="div" classes={{ root: classes.itemRoot }}>
                        <ListItemIcon
                            classes={{
                                root:
                                    incomeTotal > expenseTotal
                                        ? classes.incomeAvatarRoot
                                        : classes.expenseAvatarRoot,
                            }}>
                            {incomeTotal > expenseTotal ? (
                                <AddRoundedIcon />
                            ) : incomeTotal < expenseTotal ? (
                                <RemoveRoundedIcon />
                            ) : (
                                <div />
                            )}
                        </ListItemIcon>
                        <ListItemText
                            primary={
                                <FormatCurrency money={Math.abs(incomeTotal - expenseTotal)} />
                            }
                            secondary="Balance"
                        />
                    </ListItem>
                </List>
            </div>
            <div className={classes.boxGrow} />
        </div>
    );
}
