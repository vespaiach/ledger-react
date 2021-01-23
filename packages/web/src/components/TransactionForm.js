import { TextField, InputAdornment, makeStyles, Button } from '@material-ui/core';
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
import NumberFormat from 'react-number-format';

const validationSchema = yup.object({
    amount: yup.number('Enter amount').required('Amount is required'),
    date: yup.date('Enter date').required('Date is required'),
    category: yup.string('Enter category').required('Category is required'),
    description: yup.string('Enter description').required('Description is required'),
});

function MoneyInput(props) {
    const { inputRef, onChange, ...rest } = props;

    return (
        <NumberFormat
            {...rest}
            getInputRef={inputRef}
            onValueChange={(values) => {
                onChange({
                    target: {
                        name: props.name,
                        value: values.value,
                    },
                });
            }}
            thousandSeparator
            isNumericString
        />
    );
}

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
        marginRight: theme.spacing(3),
    },
    btnCancelRoot: {
        flex: '0 0 126px',
    },
}));

export default function Form({
    id = null,
    amount = '',
    date = null,
    description = '',
    category = '',
    categories = [],
    onSubmit,
    onCancel,
    loading,
    reset,
}) {
    const classes = useStyles();

    const formik = useFormik({
        initialValues: {
            id,
            amount,
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
                    disabled={loading}
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
                disabled={loading}
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
                disabled={loading}
                name="category"
                freeSolo
                value={formik.values.category}
                onChange={(_, value, source) => {
                    if (source === 'remove-option' || source === 'select-option') {
                        formik.handleChange({
                            name: 'category',
                            target: { name: 'category', value },
                        });
                    }
                }}
                onInputChange={(evt) => {
                    if (evt) {
                        formik.handleChange(evt);
                    }
                }}
                size="small"
                options={categories.map((c) => c.name)}
                renderInput={({ InputProps, ...rest }) => (
                    <TextField
                        {...rest}
                        name="category"
                        variant="filled"
                        label="Category"
                        error={formik.touched.category && Boolean(formik.errors.category)}
                        helperText={formik.touched.category && formik.errors.category}
                        InputProps={InputProps}
                    />
                )}
            />
            <TextField
                disabled={loading}
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
                    type="submit"
                    color="primary"
                    classes={{ root: classes.btnSubmitRoot }}
                    size="large"
                    variant="contained">
                    Submit
                </Button>
                <Button
                    size="large"
                    onClick={onCancel}
                    variant="contained"
                    classes={{ root: classes.btnCancelRoot }}>
                    Cancel
                </Button>
            </div>
        </form>
    );
}
