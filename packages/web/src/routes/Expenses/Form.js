import { TextField, Button } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';

import MasterPage from '../../components/MasterPage';

const validationSchema = yup.object({
    amount: yup.number('Enter amount').required('Amount is required'),
    date: yup.date('Enter date').required('Date is required'),
    category: yup.string('Enter category').required('Category is required'),
    description: yup
        .string('Enter description')
        .required('Description is required'),
});

export default function Form({
    id,
    amount,
    date,
    description,
    category,
    afterSuccess,
    onCancel,
}) {
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.expenses.categories || []);
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

    return (
        <MasterPage>
            <form onSubmit={formik.handleSubmit}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DateTimePicker
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
                        error={
                            formik.touched.date && Boolean(formik.errors.date)
                        }
                        helperText={formik.touched.date && formik.errors.date}
                    />
                </MuiPickersUtilsProvider>
                <TextField
                    label="Amount"
                    name="amount"
                    value={formik.values.amount}
                    onChange={formik.handleChange}
                    error={
                        formik.touched.amount && Boolean(formik.errors.amount)
                    }
                    helperText={formik.touched.amount && formik.errors.amount}
                />
                <Autocomplete
                    freeSolo
                    options={categories.map((c) => c.name)}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            name="category"
                            label="Category"
                            margin="normal"
                            error={
                                formik.touched.category &&
                                Boolean(formik.errors.category)
                            }
                            helperText={
                                formik.touched.category &&
                                formik.errors.category
                            }
                            value={formik.values.category}
                            onChange={formik.handleChange}
                        />
                    )}
                />

                <TextField
                    label="Description"
                    name="description"
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

                <Button variant="contained" onClick={onCancel}>
                    Cancel
                </Button>
                <Button type="submit" variant="contained" color="primary">
                    Submit
                </Button>
            </form>
        </MasterPage>
    );
}
