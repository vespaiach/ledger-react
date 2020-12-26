import { Paper, Typography, TextField, FormControlLabel, Checkbox } from '@material-ui/core';
import clsx from 'clsx';
import { useFormik } from 'formik';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import * as yup from 'yup';

import LoadingButton from '../../components/LoadingButton';
import AuthBasePage from '../../components/AuthBasePage';
import Copyright from '../../components/Copyright';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        marginLeft: 'auto',
        marginRight: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: 360,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(5),
        '& .MuiTextField-root': {
            marginBottom: theme.spacing(2),
        },
        '& .MuiFormControlLabel-root': {
            marginTop: theme.spacing(2),
            marginBottom: theme.spacing(2),
        },
    },
    submit: {
        margin: theme.spacing(2, 0, 5),
    },
    link: {
        display: 'block',
        margin: theme.spacing(0, 0, 2),
        textDecoration: 'none',
        color: theme.palette.text.secondary,
    },
    copyright: {
        marginTop: theme.spacing(8),
    },
}));

export default function SignIn() {
    const dispatch = useDispatch();
    const logining = useSelector((state) => state.me.loading);
    const classes = useStyles();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            remember: false,
        },
        validationSchema: yup.object({
            email: yup.string('Enter email').required('Email is required').email('Please enter a valid email'),
            password: yup.string('Enter password').required('Password is required'),
        }),
        onSubmit: ({ remember, email, password }) => {
            if (logining) {
                return;
            }

            dispatch({ type: 'Saga: login', payload: { email, password, remember } });
        },
    });

    return (
        <AuthBasePage component="main" maxWidth="xs" imgSrc="/login.svg">
            <Paper classes={{ root: classes.paper }} square elevation={0}>
                <Typography component="h1" variant="h3" color="secondary">
                    Sign in
                </Typography>
                <form className={classes.form} noValidate onSubmit={formik.handleSubmit}>
                    <TextField
                        fullWidth
                        required
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="off"
                        autoFocus
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                    />
                    <TextField
                        fullWidth
                        required
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="off"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                name="remember"
                                value={formik.values.remember}
                                onChange={formik.handleChange}
                                color="primary"
                            />
                        }
                        label="Remember me"
                    />
                    <LoadingButton
                        type="submit"
                        variant="contained"
                        color="primary"
                        loading={logining}
                        className={classes.submit}
                        fullWidth
                        disableElevation
                        size="large"
                    >
                        Submit
                    </LoadingButton>
                    <Link to="/recovery" variant="body2" className={classes.link}>
                        Forgot password?
                    </Link>
                    <Link to="/signup" variant="body2" className={classes.link}>
                        {"Don't have an account? "}
                        <b>Sign up</b>
                    </Link>
                    <Copyright className={clsx(classes.link, classes.copyright)} />
                </form>
            </Paper>
        </AuthBasePage>
    );
}
