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
import DateFnsUtils from '@date-io/date-fns';
import {
    KeyboardTimePicker,
    KeyboardDatePicker,
    MuiPickersUtilsProvider,
} from '@material-ui/pickers';

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
    const [fromDate, setFromDate] = useState(from);
    const [toDate, setToDate] = useState(to);
    const [cate, setCate] = useState(category);
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
            <DialogTitle id="form-dialog-title">Filter</DialogTitle>
            <DialogContent>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid container justify="space-around">
                        <KeyboardDatePicker
                            margin="normal"
                            label="From date"
                            format="MM/dd/yyyy"
                            value={fromDate}
                            onChange={handleFromDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                        <KeyboardTimePicker
                            margin="normal"
                            label="From time"
                            value={fromDate}
                            onChange={handleFromDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change time',
                            }}
                        />
                    </Grid>
                    <Grid container justify="space-around">
                        <KeyboardDatePicker
                            margin="normal"
                            label="To date"
                            format="MM/dd/yyyy"
                            value={toDate}
                            onChange={handleToDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                        <KeyboardTimePicker
                            margin="normal"
                            label="To time"
                            value={toDate}
                            onChange={handleToDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change time',
                            }}
                        />
                    </Grid>
                    <Grid container justify="space-around">
                        <FormControl>
                            <InputLabel>Category</InputLabel>
                            <Select
                                value={cate}
                                onChange={(e) => {
                                    setCate(e.target.value);
                                }}
                            >
                                {categories.map((c) => (
                                    <MenuItem key={c} value={c}>
                                        {c}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                </MuiPickersUtilsProvider>
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
