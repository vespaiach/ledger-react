import {
    TextField,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    InputLabel,
    Input,
    DialogContentText,
    FormControl,
    makeStyles,
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';

const validationSchema = yup.object({
    amount: yup.number('Enter amount').required('Amount is required'),
    date: yup.date('Enter date').required('Date is required'),
    category: yup.string('Enter category').required('Category is required'),
    description: yup
        .string('Enter description')
        .required('Description is required'),
});

const useStyles = makeStyles((theme) => ({
    buttons: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(2),
        '& button + button': {
            marginLeft: theme.spacing(1),
        },
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
}) {
    const dispatch = useDispatch();
    const classes = useStyles();
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
        <Dialog maxWidth="xs" open={true} onClose={onCancel}>
            <DialogTitle>New Expenses Transaction</DialogTitle>
            <form onSubmit={formik.handleSubmit}>
                <DialogContent>
                    <DialogContentText>
                        To subscribe to this website, please enter your email
                        address here. We will send updates occasionally.
                    </DialogContentText>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <FormControl fullWidth>
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
                                error={
                                    formik.touched.date &&
                                    Boolean(formik.errors.date)
                                }
                                helperText={
                                    formik.touched.date && formik.errors.date
                                }
                            />
                        </FormControl>
                    </MuiPickersUtilsProvider>
                    <FormControl fullWidth>
                        <TextField
                            size="small"
                            label="Amount"
                            name="amount"
                            value={formik.values.amount}
                            onChange={formik.handleChange}
                            error={
                                formik.touched.amount &&
                                Boolean(formik.errors.amount)
                            }
                            helperText={
                                formik.touched.amount && formik.errors.amount
                            }
                        />
                    </FormControl>
                    <FormControl fullWidth>
                        <Autocomplete
                            freeSolo
                            size="small"
                            options={categories.map((c) => c.name)}
                            renderInput={(params) => (
                                <>
                                    <InputLabel htmlFor="standard-adornment-password">
                                        Password
                                    </InputLabel>
                                    <Input
                                        {...params}
                                        size="small"
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
                                </>
                            )}
                        />
                    </FormControl>
                    <FormControl fullWidth>
                        <TextField
                            multiline={true}
                            label="Description"
                            name="description"
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            error={
                                formik.touched.description &&
                                Boolean(formik.errors.description)
                            }
                            helperText={
                                formik.touched.description &&
                                formik.errors.description
                            }
                        />
                    </FormControl>
                    <div className={classes.buttons}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            disableElevation
                        >
                            Submit
                        </Button>
                        <Button
                            variant="contained"
                            onClick={onCancel}
                            disableElevation
                        >
                            Cancel
                        </Button>
                    </div>
                </DialogContent>
            </form>
        </Dialog>
    );
}
