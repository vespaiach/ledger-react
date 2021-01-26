import {
    Button,
    TextField,
    makeStyles,
    Typography,
    IconButton,
    InputAdornment,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import {
    VisibilityOff as VisibilityOffIcon,
    Visibility as VisibilityIcon,
    ArrowBackRounded as ArrowBackIcon,
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
            marginTop: theme.spacing(2),
        },
    },
    boxPageTitle: {
        display: 'flex',
        alignItems: 'center',
    },
    btnPreviousRoot: {
        marginRight: theme.spacing(2),
    },
    boxError: {
        marginTop: theme.spacing(3),
    },
}));

export default function Signin() {
    const [passwordVisibility, setPasswordVisibility] = useState(false);
    const dispatch = useDispatch();
    const error = useSelector((state) => state.signup.error);
    const classes = useStyles();
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
        },
        validationSchema: yup.object({
            name: yup.string('enter name').required('name is required'),
            email: yup
                .string('enter email')
                .required('email is required')
                .email('enter a valid email'),
            password: yup.string('enter password').required('password is required').min(8),
        }),
        onSubmit: ({ name, email, password }) => {
            dispatch({
                type: 'Saga: submit signup form',
                payload: { name, email, password },
            });
        },
    });

    const handleClearError = () => dispatch({ type: 'Reducer - signup: clear errors' });

    return (
        <PublicPageShell imgSrc="/signup.jpg" imgSsrc="/s_signup.jpg">
            <div className={classes.boxPageTitle}>
                <IconButton
                    classes={{ root: classes.btnPreviousRoot }}
                    component={Link}
                    to="/signin"
                    edge="start"
                    title="go back to login page"
                    aria-label="go back to login page">
                    <ArrowBackIcon />
                </IconButton>
                <Typography variant="h4" component="h1" color="primary">
                    Sign Up
                </Typography>
            </div>
            <form className={classes.formSignup} onSubmit={formik.handleSubmit}>
                <TextField
                    id="your-name"
                    label="Your Name"
                    variant="filled"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    fullWidth
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                />
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
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={
                        formik.touched.password && formik.errors.password
                            ? formik.errors.password
                            : 'password should be 8 characters at least'
                    }
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
                <Button variant="contained" color="primary" fullWidth size="large" type="submit">
                    Sign Up
                </Button>
                <ErrorAlert
                    open={Boolean(error)}
                    className={classes.boxError}
                    title={error && error.title}
                    onClose={handleClearError}>
                    {error ? error.messages.map((e) => <div key={e}>{e}</div>) : null}
                </ErrorAlert>
            </form>
        </PublicPageShell>
    );
}
