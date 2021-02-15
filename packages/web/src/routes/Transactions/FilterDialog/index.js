import {
    InputAdornment,
    Container,
    Grid,
    Checkbox,
    Box,
    Typography,
    Divider,
    TextField,
    Switch,
} from '@material-ui/core';
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import {
    AttachMoneyRounded as AttachMoneyRoundedIcon,
    CalendarTodayRounded as CalendarTodayRoundedIcon,
} from '@material-ui/icons';
import DateFnsUtils from '@date-io/date-fns';
import { makeStyles } from '@material-ui/core/styles';

import DialogPanel from '../../../components/DialogPanel';

const useStyles = makeStyles((theme) => ({
    checkboxTypo: {
        flexGrow: 1,
    },
    boxIncome: {
        marginBottom: theme.spacing(1),
        marginTop: theme.spacing(3),
    },
    boxExpense: {
        marginBottom: theme.spacing(1),
    },
    subTextAmount: {
        marginBottom: theme.spacing(3),
        color: (props) =>
            props.enableAmountFilter === false
                ? theme.palette.text.disabled
                : theme.palette.text.primary,
    },
    subTextDate: {
        marginBottom: theme.spacing(3),
        color: (props) =>
            props.enableDateFilter === false
                ? theme.palette.text.disabled
                : theme.palette.text.primary,
    },
    textAmount: {
        color: (props) =>
            props.enableAmountFilter === false
                ? theme.palette.text.disabled
                : theme.palette.text.primary,
    },
    textDate: {
        color: (props) =>
            props.enableDateFilter === false
                ? theme.palette.text.disabled
                : theme.palette.text.primary,
    },
    boxSlider: {
        marginBottom: theme.spacing(2),
    },
    boxMinMax: {
        '& > div + div': {
            marginLeft: theme.spacing(2),
        },
        marginBottom: theme.spacing(2),
    },
    boxDate: {
        '& .MuiTextField-root + .MuiTextField-root': {
            marginTop: theme.spacing(3),
        },
    },
}));

function parseNumber(val) {
    try {
        const num = parseFloat(val);
        if (num > 0) {
            return num;
        }
    } catch (e) {
        console.error(e);
    }
    return 0;
}

export default function FilterDialog({ open, filter, dispatch, onClose, onReset }) {
    const classes = useStyles({
        enableAmountFilter: filter.enableAmountFilter,
        enableDateFilter: filter.enableDateFilter,
    });

    return (
        <DialogPanel title="Filters" open={open} onClose={onClose} onReset={onReset}>
            <Container maxWidth="sm">
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Box
                            display="flex"
                            alignItems="center"
                            classes={{ root: classes.boxIncome }}>
                            <Box flexGrow="1">
                                <Typography variant="h6">Income</Typography>
                                <Typography variant="body2">Show income transactions</Typography>
                            </Box>
                            <Checkbox
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                                checked={filter.income}
                                value={filter.income}
                                onChange={(evt) => {
                                    dispatch({
                                        type: 'Reducer: filter transactions by income type',
                                        payload: evt.target.checked,
                                    });
                                }}
                            />
                        </Box>
                        <Box
                            display="flex"
                            alignItems="center"
                            classes={{ root: classes.boxExpense }}>
                            <Box flexGrow="1">
                                <Typography variant="h6">Expense</Typography>
                                <Typography variant="body2">Show expense transactions</Typography>
                            </Box>
                            <Checkbox
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                                checked={filter.expense}
                                value={filter.expense}
                                onChange={(evt) => {
                                    dispatch({
                                        type: 'Reducer: filter transactions by expense type',
                                        payload: evt.target.checked,
                                    });
                                }}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Divider />
                    </Grid>
                    <Grid item xs={12}>
                        <Box display="flex">
                            <Box flexGrow="1" marginRight={4}>
                                <Typography variant="h6" classes={{ root: classes.textAmount }}>
                                    Amount
                                </Typography>
                                <Typography
                                    variant="body2"
                                    classes={{ root: classes.subTextAmount }}>
                                    Filter transactions by amount range
                                </Typography>
                            </Box>
                            <Switch
                                checked={filter.enableAmountFilter}
                                edge="end"
                                inputProps={{ 'aria-label': 'secondary checkbox' }}
                                onChange={(evt) =>
                                    dispatch({
                                        type: evt.target.checked
                                            ? 'Reducer: set filter transactions by amount on'
                                            : 'Reducer: set filter transactions by amount off',
                                    })
                                }
                            />
                        </Box>
                        <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="space-between"
                            classes={{ root: classes.boxMinMax }}>
                            <TextField
                                disabled={!filter.enableAmountFilter}
                                value={filter.amountFrom}
                                label="Min amount"
                                size="small"
                                type="number"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <AttachMoneyRoundedIcon />
                                        </InputAdornment>
                                    ),
                                }}
                                variant="outlined"
                                onChange={(evt) => {
                                    const amountFrom = parseNumber(evt.target.value);
                                    dispatch({
                                        type: 'Reducer: filter transactions by amountFrom',
                                        payload: amountFrom,
                                    });
                                }}
                            />
                            <div> - </div>
                            <TextField
                                disabled={!filter.enableAmountFilter}
                                value={filter.amountTo}
                                label="Max amount"
                                type="number"
                                size="small"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <AttachMoneyRoundedIcon />
                                        </InputAdornment>
                                    ),
                                }}
                                variant="outlined"
                                onChange={(evt) => {
                                    const amountTo = parseNumber(evt.target.value);
                                    dispatch({
                                        type: 'Reducer: filter transactions by amountTo',
                                        payload: amountTo,
                                    });
                                }}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Divider />
                    </Grid>
                    <Grid item xs={12}>
                        <Box display="flex">
                            <Box flexGrow="1" marginRight={4}>
                                <Typography variant="h6" classes={{ root: classes.textDate }}>
                                    Date
                                </Typography>
                                <Typography variant="body2" classes={{ root: classes.subTextDate }}>
                                    Filter transactions by date range
                                </Typography>
                            </Box>
                            <Switch
                                edge="end"
                                checked={filter.enableDateFilter}
                                onChange={(evt) =>
                                    dispatch({
                                        type: evt.target.checked
                                            ? 'Reducer: set filter transactions by date on'
                                            : 'Reducer: set filter transactions by date off',
                                    })
                                }
                                inputProps={{ 'aria-label': 'secondary checkbox' }}
                            />
                        </Box>
                        <div className={classes.boxDate}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <DateTimePicker
                                    disabled={!filter.enableDateFilter}
                                    clearable
                                    size="small"
                                    label="From date"
                                    format="MMM do, yyyy HH:mm"
                                    value={filter.dateFrom}
                                    onChange={(value) => {
                                        dispatch({
                                            type: 'Reducer: filter transactions by dateFrom',
                                            payload: value,
                                        });
                                    }}
                                    fullWidth
                                    inputVariant="outlined"
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment
                                                position="end"
                                                classes={{
                                                    root: classes.adornment,
                                                }}>
                                                <CalendarTodayRoundedIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </MuiPickersUtilsProvider>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <DateTimePicker
                                    disabled={!filter.enableDateFilter}
                                    clearable
                                    size="small"
                                    label="To date"
                                    format="MMM do, yyyy HH:mm"
                                    value={filter.dateTo}
                                    onChange={(value) => {
                                        dispatch({
                                            type: 'Reducer: filter transactions by dateTo',
                                            payload: value,
                                        });
                                    }}
                                    fullWidth
                                    inputVariant="outlined"
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment
                                                position="end"
                                                classes={{
                                                    root: classes.adornment,
                                                }}>
                                                <CalendarTodayRoundedIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </MuiPickersUtilsProvider>
                        </div>
                    </Grid>
                </Grid>
            </Container>
        </DialogPanel>
    );
}
