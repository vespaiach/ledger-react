import {
    Button,
    ListItem,
    ListItemText,
    ListItemIcon,
    DialogTitle,
    List,
    DialogActions,
} from '@material-ui/core';
import {
    CalendarTodayRounded as CalendarTodayRoundedIcon,
    QueryBuilderRounded as QueryBuilderRoundedIcon,
    DescriptionRounded as DescriptionRoundedIcon,
    CategoryRounded as CategoryRoundedIcon,
    AttachMoneyRounded as AttachMoneyRoundedIcon,
} from '@material-ui/icons';
import NumberFormat from 'react-number-format';
import { format } from 'date-fns';
import { makeStyles } from '@material-ui/core/styles';

import DialogPanel from './DialogPanel';

const useStyles = makeStyles((theme) => ({
    box: {
        padding: theme.spacing(2, 1),
    },
}));

export default function TransactionDialog({ open, transactionDetail, onClose, onEdit, onDelete }) {
    const classes = useStyles();

    let el = null;
    if (transactionDetail) {
        el = (
            <List>
                <ListItem>
                    <ListItemIcon>
                        <AttachMoneyRoundedIcon />
                    </ListItemIcon>
                    <ListItemText>
                        <NumberFormat
                            value={transactionDetail.amount}
                            displayType={'text'}
                            thousandSeparator={true}
                        />
                    </ListItemText>
                </ListItem>
                <ListItem>
                    <ListItemIcon>
                        <CalendarTodayRoundedIcon />
                    </ListItemIcon>
                    <ListItemText primary={format(transactionDetail.date, 'LLL do, yyyy')} />
                </ListItem>
                <ListItem>
                    <ListItemIcon>
                        <QueryBuilderRoundedIcon />
                    </ListItemIcon>
                    <ListItemText primary={format(transactionDetail.date, 'HH:mm')} />
                </ListItem>
                <ListItem>
                    <ListItemIcon>
                        <CategoryRoundedIcon />
                    </ListItemIcon>
                    <ListItemText primary={transactionDetail.category} />
                </ListItem>
                <ListItem>
                    <ListItemIcon>
                        <DescriptionRoundedIcon />
                    </ListItemIcon>
                    <ListItemText primary={transactionDetail.description} />
                </ListItem>
            </List>
        );
    }

    return (
        <DialogPanel
            title={<DialogTitle id="detail-dialog-title">Transaction's Details</DialogTitle>}
            footer={
                <DialogActions>
                    <Button
                        size="small"
                        color="primary"
                        onClick={() => {
                            onEdit(transactionDetail.id);
                        }}>
                        Edit
                    </Button>
                    <Button
                        size="small"
                        color="primary"
                        onClick={() => {
                            onDelete(transactionDetail.id);
                        }}>
                        Delete
                    </Button>
                </DialogActions>
            }
            open={open}
            onClose={onClose}
            aria-labelledby="detail-dialog-title">
            <div className={classes.box}>{el}</div>
        </DialogPanel>
    );
}
