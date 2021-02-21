import {
    Radio,
    TextField,
    InputAdornment,
    makeStyles,
    Button,
    FormControlLabel,
    RadioGroup,
} from '@material-ui/core';
import {
    AttachMoney as AttachMoneyIcon,
    CalendarToday as CalendarTodayIcon,
} from '@material-ui/icons';
import { Autocomplete } from '@material-ui/lab';
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useEffect } from 'react';

import MoneyInput from './MoneyInput';

const validationSchema = yup.object({
    amount: yup.number('Enter amount').required('Amount is required'),
    date: yup.date('Enter date').required('Date is required'),
    category: yup.string('Enter category').required('Category is required'),
    description: yup.string('Enter description').required('Description is required'),
});

const useStyles = makeStyles((theme) => ({
    adornment: {
        color: theme.palette.text.disabled,
        height: 16,
    },
    form: {
        '& .MuiFormControl-root': {
            marginBottom: theme.spacing(2),
        },
    },
    boxBtns: {
        marginTop: theme.spacing(1),
        display: 'flex',
    },
    btnSubmitRoot: {
        flex: 1,
        marginLeft: theme.spacing(3),
    },
    btnCancelRoot: {
        flex: '0 0 126px',
    },
    radioGroupRoot: {
        flexFlow: 'row',
        marginBottom: 4,
    },
}));

export default function Form({
    id = null,
    amount = '',
    date = null,
    transactionType = 'ex',
    description = '',
    category = '',
    categories = [],
    onSubmit,
    onCancel,
    reset,
}) {
    const classes = useStyles();

    const formik = useFormik({
        initialValues: {
            id,
            amount,
            transactionType,
            date,
            description,
            category,
        },
        validationSchema,
        onSubmit,
    });

    useEffect(() => {
        if (reset && formik) {
            formik.resetForm();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reset]);

    return (
        <form onSubmit={formik.handleSubmit} className={classes.form}>
            <RadioGroup
                aria-label="transaction type"
                name="transactionType"
                value={formik.values.transactionType}
                classes={{ root: classes.radioGroupRoot }}
                onChange={formik.handleChange}>
                <FormControlLabel value="in" control={<Radio />} label="Income" />
                <FormControlLabel value="ex" control={<Radio />} label="Expense" />
            </RadioGroup>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DateTimePicker
                    clearable
                    size="small"
                    label="Date"
                    format="MMM do, yyyy HH:mm"
                    name="date"
                    value={formik.values.date}
                    onChange={(value) => {
                        /**
                         * Datetime picker doesn't return a SyntheticEvent,
                         * so we have to fake one in order to make formik work
                         */
                        formik.handleChange({
                            target: { name: 'date', value },
                        });
                    }}
                    fullWidth
                    error={formik.touched.date && Boolean(formik.errors.date)}
                    helperText={formik.touched.date && formik.errors.date}
                    inputVariant="filled"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment
                                position="end"
                                classes={{
                                    root: classes.adornment,
                                }}>
                                <CalendarTodayIcon />
                            </InputAdornment>
                        ),
                    }}
                />
            </MuiPickersUtilsProvider>
            <TextField
                fullWidth
                variant="filled"
                size="small"
                label="Amount"
                name="amount"
                value={formik.values.amount}
                onChange={formik.handleChange}
                error={formik.touched.amount && Boolean(formik.errors.amount)}
                helperText={formik.touched.amount && formik.errors.amount}
                InputProps={{
                    inputComponent: MoneyInput,
                    endAdornment: (
                        <InputAdornment
                            position="end"
                            classes={{
                                root: classes.adornment,
                            }}>
                            <AttachMoneyIcon />
                        </InputAdornment>
                    ),
                }}
            />
            <Autocomplete
                name="category"
                freeSolo
                disableClearable
                value={formik.values.category}
                onChange={(_, value, source) => {
                    if (
                        source === 'remove-option' ||
                        source === 'select-option' ||
                        source === 'clear'
                    ) {
                        formik.handleChange({
                            name: 'category',
                            target: { name: 'category', value },
                        });
                    }
                }}
                size="small"
                options={categories}
                renderInput={(props) => (
                    <TextField
                        {...props}
                        name="category"
                        variant="filled"
                        label="Category"
                        InputProps={{ ...props.InputProps, type: 'search' }}
                        error={formik.touched.category && Boolean(formik.errors.category)}
                        helperText={formik.touched.category && formik.errors.category}
                    />
                )}
            />
            <TextField
                variant="filled"
                multiline
                label="Description"
                name="description"
                rows={3}
                value={formik.values.description}
                onChange={formik.handleChange}
                error={formik.touched.description && Boolean(formik.errors.description)}
                helperText={formik.touched.description && formik.errors.description}
                fullWidth
            />
            <div className={classes.boxBtns}>
                <Button
                    size="large"
                    onClick={onCancel}
                    variant="contained"
                    disableElevation
                    classes={{ root: classes.btnCancelRoot }}>
                    Cancel
                </Button>
                <Button
                    type="submit"
                    color="primary"
                    classes={{ root: classes.btnSubmitRoot }}
                    size="large"
                    disableElevation
                    variant="contained">
                    Submit
                </Button>
            </div>
        </form>
    );
}
