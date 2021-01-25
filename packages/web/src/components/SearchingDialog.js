import {
    DialogTitle,
    DialogActions,
    Button,
    makeStyles,
    TextField,
    InputAdornment,
} from '@material-ui/core';
import { useFormik } from 'formik';
import { Autocomplete } from '@material-ui/lab';
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import * as yup from 'yup';
import {
    CalendarTodayRounded as CalendarTodayRoundedIcon,
    AttachMoneyRounded as AttachMoneyRoundedIcon,
} from '@material-ui/icons';

import MoneyInput from './MoneyInput';
import DialogPanel from './DialogPanel';
import { useEffect } from 'react';

const validationSchema = yup.object({
    amountFrom: yup.number('Please input amount').notRequired(),
    amountTo: yup.number('Please input amount').notRequired(),
    dateFrom: yup.date('Please input a valid date').nullable().notRequired(),
    dateTo: yup.date('Please input a valid date').nullable().notRequired(),
    category: yup.string('Please input category').notRequired(),
});

const useStyles = makeStyles((theme) => ({
    form: {
        padding: theme.spacing(4, 3, 3, 3),
        '& .MuiFormControl-root': {
            marginBottom: theme.spacing(2),
        },
    },
}));

export default function SortDialog({
    open,
    dateFrom,
    dateTo,
    amountFrom,
    amountTo,
    categories,
    category,
    onClose,
    onApply,
    onReset,
}) {
    const classes = useStyles();
    const formik = useFormik({
        initialValues: {
            byAmountFrom: amountFrom,
            byAmountTo: amountTo,
            byDateFrom: dateFrom,
            byDateTo: dateTo,
            byCategory: category,
        },
        validationSchema,
        onSubmit: onApply,
    });

    useEffect(() => {
        formik.setFieldValue('byDateFrom', dateFrom);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dateFrom]);

    useEffect(() => {
        formik.setFieldValue('byDateTo', dateTo);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dateTo]);

    useEffect(() => {
        formik.setFieldValue('byAmountFrom', amountFrom);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [amountFrom]);

    useEffect(() => {
        formik.setFieldValue('byAmountTo', amountTo);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [amountTo]);

    useEffect(() => {
        formik.setFieldValue('byCategory', category);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [category]);

    return (
        <DialogPanel
            open={open}
            onClose={onClose}
            aria-labelledby="sorting-dialog-title"
            title={<DialogTitle id="sorting-dialog-title">Transaction's Searching</DialogTitle>}
            footer={
                <DialogActions>
                    <Button
                        size="small"
                        color="primary"
                        onClick={formik.handleSubmit}
                        title="apply ordering">
                        Apply
                    </Button>
                    <Button size="small" color="primary" onClick={onReset} title="reset to default">
                        Reset
                    </Button>
                </DialogActions>
            }>
            <form onSubmit={formik.handleSubmit} className={classes.form}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DateTimePicker
                        clearable
                        size="small"
                        label="From Date"
                        format="MMM do, yyyy HH:mm"
                        name="byDateFrom"
                        value={formik.values.byDateFrom}
                        onChange={(value) => {
                            /**
                             * Datetime picker doesn't return a SyntheticEvent,
                             * so we have to fake one in order to make formik work
                             */
                            formik.handleChange({
                                target: { name: 'byDateFrom', value },
                            });
                        }}
                        fullWidth
                        error={formik.touched.byDateFrom && Boolean(formik.errors.byDateFrom)}
                        helperText={formik.touched.byDateFrom && formik.errors.byDateFrom}
                        inputVariant="filled"
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
                        clearable
                        size="small"
                        label="To Date"
                        format="MMM do, yyyy HH:mm"
                        name="byDateTo"
                        value={formik.values.byDateTo}
                        onChange={(value) => {
                            /**
                             * Datetime picker doesn't return a SyntheticEvent,
                             * so we have to fake one in order to make formik work
                             */
                            formik.handleChange({
                                target: { name: 'byDateTo', value },
                            });
                        }}
                        fullWidth
                        error={formik.touched.byDateTo && Boolean(formik.errors.byDateTo)}
                        helperText={formik.touched.byDateTo && formik.errors.byDateTo}
                        inputVariant="filled"
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
                <TextField
                    fullWidth
                    variant="filled"
                    size="small"
                    label="From Amount"
                    name="byAmountFrom"
                    value={formik.values.byAmountFrom}
                    onChange={formik.handleChange}
                    error={formik.touched.byAmountFrom && Boolean(formik.errors.byAmountFrom)}
                    helperText={formik.touched.byAmountFrom && formik.errors.byAmountFrom}
                    InputProps={{
                        inputComponent: MoneyInput,
                        endAdornment: (
                            <InputAdornment
                                position="end"
                                classes={{
                                    root: classes.adornment,
                                }}>
                                <AttachMoneyRoundedIcon />
                            </InputAdornment>
                        ),
                    }}
                />
                <TextField
                    fullWidth
                    variant="filled"
                    size="small"
                    label="To Amount"
                    name="byAmountTo"
                    value={formik.values.byAmountTo}
                    onChange={formik.handleChange}
                    error={formik.touched.byAmountTo && Boolean(formik.errors.byAmountTo)}
                    helperText={formik.touched.byAmountTo && formik.errors.byAmountTo}
                    InputProps={{
                        inputComponent: MoneyInput,
                        endAdornment: (
                            <InputAdornment
                                position="end"
                                classes={{
                                    root: classes.adornment,
                                }}>
                                <AttachMoneyRoundedIcon />
                            </InputAdornment>
                        ),
                    }}
                />
                <Autocomplete
                    name="category"
                    freeSolo
                    value={formik.values.byCategory}
                    onChange={(_, value, source) => {
                        if (source === 'remove-option' || source === 'select-option') {
                            formik.handleChange({
                                name: 'byCategory',
                                target: { name: 'byCategory', value },
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
                            name="byCategory"
                            variant="filled"
                            label="Category"
                            error={formik.touched.byCategory && Boolean(formik.errors.byCategory)}
                            helperText={formik.touched.byCategory && formik.errors.byCategory}
                            InputProps={InputProps}
                        />
                    )}
                />
            </form>
        </DialogPanel>
    );
}
