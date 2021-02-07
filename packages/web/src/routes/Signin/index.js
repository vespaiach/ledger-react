import {
    Button,
    TextField,
    makeStyles,
    Typography,
    IconButton,
    InputAdornment,
    FormControlLabel,
    Checkbox,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import {
    VisibilityOff as VisibilityOffIcon,
    Visibility as VisibilityIcon,
} from '@material-ui/icons';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { useState } from 'react';
import { Alert } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
    formSignup: {
        marginTop: theme.spacing(5),
        '& .MuiTextField-root + .MuiTextField-root': {
            marginTop: theme.spacing(2),
        },
        '& .MuiButton-root': {
            marginTop: theme.spacing(1),
        },
        '& .MuiFormControlLabel-root': {
            marginTop: theme.spacing(1),
        },
    },
    lineOneRoot: {
        margin: theme.spacing(3, 0, 5, 0),
    },
    lineTwoRoot: {
        marginBottom: theme.spacing(1),
    },
}));

export default function Signin() {
    const dispatch = useDispatch();
    const classes = useStyles();
    const [passwordVisibility, setPasswordVisibility] = useState(false);
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            remember: false,
        },
        validationSchema: yup.object({
            email: yup
                .string('enter email')
                .required('email is required')
                .email('enter a valid email'),
            password: yup.string('enter password').required('password is required').min(8),
        }),
        onSubmit: ({ email, remember, password }) => {
            dispatch({
                type: 'Saga: signin',
                payload: { email, password, remember },
            });
        },
    });

    return (
        <form className={classes.formSignup} onSubmit={formik.handleSubmit}>
            <Typography component={Alert} severity="error" classes={{ root: classes.lineOneRoot }}>
                You haven't signed in or your session has been expired.
            </Typography>
            <Typography classes={{ root: classes.lineTwoRoot }}>
                Please sign in to continue.
            </Typography>
            <TextField
                id="your-email"
                label="Your Email"
                variant="filled"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                fullWidth
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
                id="your-password"
                label="Your Password"
                variant="filled"
                fullWidth
                type={passwordVisibility ? 'text' : 'password'}
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.password && formik.errors.password}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={() => setPasswordVisibility(!passwordVisibility)}>
                                {passwordVisibility ? <VisibilityIcon /> : <VisibilityOffIcon />}
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
            <FormControlLabel
                control={
                    <Checkbox
                        name="remember"
                        color="primary"
                        onChange={formik.handleChange}
                        checked={formik.values.remember}
                    />
                }
                label="Remember me"
            />
            <Button variant="contained" color="primary" fullWidth size="large" type="submit">
                Submit
            </Button>
        </form>
    );
}
