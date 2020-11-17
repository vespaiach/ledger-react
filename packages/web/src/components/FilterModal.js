import { useState } from 'react';
import {
    Button,
    Grid,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Select,
    FormControl,
    InputLabel,
    MenuItem,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    select: {
        margin: theme.spacing(1),
        marginBottom: theme.spacing(4),
    },
}));

export default function FilterModal({
    from = null,
    to = null,
    category = '',
    categories = [],
    open,
    onClose,
    onSubmit,
    onClear,
}) {
    const classes = useStyles();
    const [fromDate, setFromDate] = useState(from);
    const [toDate, setToDate] = useState(to);
    const [cate, setCate] = useState(category || '');
    const handleFromDateChange = (date) => {
        setFromDate(date);
    };
    const handleToDateChange = (date) => {
        setToDate(date);
    };
    const handleSubmit = () => {
        if (onSubmit) {
            onSubmit({ from: fromDate, to: toDate, category: cate });
        }
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="form-dialog-title"
        >
            <DialogTitle>Filter</DialogTitle>
            <DialogContent>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <div className={classes.root}>
                        <DateTimePicker
                            label="From date"
                            format="MMM do hh:mm aaaa"
                            value={fromDate}
                            onChange={handleFromDateChange}
                        />

                        <DateTimePicker
                            label="To date"
                            format="MMM do hh:mm aaaa"
                            value={toDate}
                            onChange={handleToDateChange}
                        />
                    </div>
                </MuiPickersUtilsProvider>
                <FormControl classes={{ root: classes.select }} fullWidth>
                    <InputLabel>Category</InputLabel>
                    <Select
                        value={cate}
                        onChange={(e) => {
                            setCate(e.target.value);
                        }}
                    >
                        {(categories || []).map((c) => (
                            <MenuItem key={c} value={c}>
                                {c}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClear} color="primary">
                    Clear
                </Button>
                <Button onClick={handleSubmit} color="primary">
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    );
}
