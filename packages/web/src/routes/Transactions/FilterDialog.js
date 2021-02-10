import {
    ListItem,
    ListItemText,
    ListItemIcon,
    List,
    Container,
    Grid,
    IconButton,
    Checkbox,
    Box,
    Typography,
} from '@material-ui/core';
import {
    CalendarTodayRounded as CalendarTodayRoundedIcon,
    QueryBuilderRounded as QueryBuilderRoundedIcon,
    DescriptionRounded as DescriptionRoundedIcon,
    CategoryRounded as CategoryRoundedIcon,
    AttachMoneyRounded as AttachMoneyRoundedIcon,
    EditRounded as EditRoundedIcon,
    DeleteForeverRounded as DeleteRoundedIcon,
} from '@material-ui/icons';
import NumberFormat from 'react-number-format';
import { makeStyles } from '@material-ui/core/styles';
import { format } from 'date-fns';

import DialogPanel from '../../components/DialogPanel';

const useStyles = makeStyles((theme) => ({
    checkboxTypo: {
        flexGrow: 1,
    },
}));

export default function FilterDialog({
    open,
    dateFrom,
    dateTo,
    amountFrom,
    amountTo,
    type,
    onClose,
    onClear,
}) {
    const classes = useStyles();

    return (
        <DialogPanel title="Filters" open={open} onClose={onClose}>
            <Container maxWidth="sm">
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Box display="flex" alignItems="center">
                            <Box flexGrow="1">
                                <Typography variant="subtitle1">Income</Typography>
                                <Typography variant="body2">Show income transactions</Typography>
                            </Box>
                            <Checkbox inputProps={{ 'aria-label': 'primary checkbox' }} />
                        </Box>
                        <Box display="flex" alignItems="center">
                            <Box flexGrow="1">
                                <Typography variant="subtitle1">Expense</Typography>
                                <Typography variant="body2">Show expense transactions</Typography>
                            </Box>
                            <Checkbox inputProps={{ 'aria-label': 'primary checkbox' }} />
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </DialogPanel>
    );
}
