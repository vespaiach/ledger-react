import { TextField, InputAdornment, makeStyles } from '@material-ui/core';
import {
    AttachMoney as AttachMoneyIcon,
    CalendarToday as CalendarTodayIcon,
} from '@material-ui/icons';
import { Autocomplete } from '@material-ui/lab';
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { useEffect } from 'react';
import MoneyInput from '../../components/MoneyInput';
import FormDialog from '../../components/FormDialog';

const validationSchema = yup.object({
    amount: yup.number('Enter amount').required('Amount is required'),
    date: yup.date('Enter date').required('Date is required'),
    category: yup.string('Enter category').required('Category is required'),
    description: yup
        .string('Enter description')
        .required('Description is required'),
});

const useStyles = makeStyles((theme) => ({
    adornment: {
        color: theme.palette.text.disabled,
        height: 16,
    },
}));

export default function Form({
    id,
    amount,
    date,
    description,
    category,
    afterSuccess,
    onCancel,
    open,
    ...rest
}) {
    const dispatch = useDispatch();
    const classes = useStyles();
    const categories = useSelector((state) => state.expenses.categories || []);
    const title = id ? 'EDIT A TRANSACTION' : 'CREATE A NEW TRANSACTION';
    const formik = useFormik({
        initialValues: {
            amount,
            date,
            description,
            category,
        },
        validationSchema,
        onSubmit: (values) => {
            dispatch({
                type: 'Request: editing expense - save',
                payload: { ...values, id },
                afterSuccess,
            });
        },
    });

    /* eslint-disable react-hooks/exhaustive-deps */
    useEffect(() => {
        if (open) {
            formik.setValues(
                {
                    amount,
                    date,
                    description,
                    category,
                },
                false
            );
        } else {
            formik.resetForm();
        }
    }, [amount, date, description, category, open]);

    return (
        <FormDialog
            {...rest}
            title={title}
            open={open}
            onClose={onCancel}
            onSubmit={formik.handleSubmit}
        >
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
                    error={formik.touched.date && Boolean(formik.errors.date)}
                    helperText={formik.touched.date && formik.errors.date}
                    inputVariant="filled"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment
                                position="end"
                                classes={{
                                    root: classes.adornment,
                                }}
                            >
                                <CalendarTodayIcon />
                            </InputAdornment>
                        ),
                    }}
                />
            </MuiPickersUtilsProvider>
            <TextField
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
                            }}
                        >
                            <AttachMoneyIcon />
                        </InputAdornment>
                    ),
                }}
            />
            <Autocomplete
                name="category"
                
                freeSolo
                value={formik.values.category}
                onChange={(_, value, source) => {
                    if (
                        source === 'remove-option' ||
                        source === 'select-option'
                    ) {
                        formik.handleChange({
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
                        error={
                            formik.touched.category &&
                            Boolean(formik.errors.category)
                        }
                        helperText={
                            formik.touched.category && formik.errors.category
                        }
                        InputProps={InputProps}
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
                error={
                    formik.touched.description &&
                    Boolean(formik.errors.description)
                }
                helperText={
                    formik.touched.description && formik.errors.description
                }
            />
        </FormDialog>
    );
}
