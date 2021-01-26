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
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { useState } from 'react';

import PublicPageShell from '../../components/PublicPageShell';
import ErrorAlert from '../../components/ErrorAlert';

const useStyles = makeStyles((theme) => ({
    formSignup: {
        marginTop: theme.spacing(3),
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
    boxSignup: {
        marginTop: theme.spacing(5),
        '& .MuiTypography-root + .MuiTypography-root': {
            marginTop: theme.spacing(1),
        },
    },
    boxError: {
        marginTop: theme.spacing(3),
    },
}));

export default function Signin() {
    const [passwordVisibility, setPasswordVisibility] = useState(false);
    const dispatch = useDispatch();
    const classes = useStyles();
    const error = useSelector((state) => state.signin.error);
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
                type: 'Saga: submit signin form',
                payload: { email, password, remember },
            });
        },
    });

    return (
        <PublicPageShell imgSrc="/signin.jpg" imgSsrc="/s_signin.jpg">
            <Typography variant="h4" component="h1" color="primary">
                Sign In
            </Typography>
            <form className={classes.formSignup} onSubmit={formik.handleSubmit}>
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
                                    {passwordVisibility ? (
                                        <VisibilityIcon />
                                    ) : (
                                        <VisibilityOffIcon />
                                    )}
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
                    Sign In
                </Button>
            </form>
            <ErrorAlert
                open={Boolean(error)}
                className={classes.boxError}
                title={error && error.title}
                onClose={() => dispatch({ type: 'Reducer - signin: clear errors' })}>
                {error ? error.messages.map((e) => <div key={e}>{e}</div>) : null}
            </ErrorAlert>
            <div className={classes.boxSignup}>
                <Typography>
                    <Link to="/signup" title="Sigin up for a new account">
                        Sign up
                    </Link>
                    <span> for a new account</span>
                </Typography>
                <Typography>
                    <Link to="/recovery" title="Recover your password">
                        Recover
                    </Link>
                    <span> your password</span>
                </Typography>
            </div>
        </PublicPageShell>
    );
}
