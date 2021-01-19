import {
    Button,
    TextField,
    InputAdornment,
    makeStyles,
    Typography,
    IconButton,
    Collapse,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import {
    ArrowBack as ArrowBackIcon,
    Visibility as VisibilityIcon,
    VisibilityOff as VisibilityOffIcon,
} from '@material-ui/icons';
import { Alert, AlertTitle } from '@material-ui/lab';

import ErrorAlert from '../../components/ErrorAlert';

const useStyles = makeStyles((theme) => ({
    formSignup: {
        marginTop: theme.spacing(5),
        '& .MuiTextField-root + .MuiTextField-root': {
            marginTop: theme.spacing(2),
        },
        '& .MuiButton-root': {
            marginTop: theme.spacing(3),
        },
    },
    boxPageTitle: {
        marginTop: theme.spacing(12),
        [theme.breakpoints.down('sm')]: {
            marginTop: theme.spacing(3),
        },
        display: 'flex',
        alignItems: 'flex-start',
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
    boxInfo: {
        marginTop: theme.spacing(5),
    },
    btnPreviousRoot: {
        marginRight: theme.spacing(3),
    },
}));

export default function ChangePass({ token }) {
    const [passwordVisibility, setPasswordVisibility] = useState(false);
    const status = useSelector((state) => state.recovery.status);
    const dispatch = useDispatch();
    const classes = useStyles();
    const error = useSelector((state) => state.signin.error);
    const formik = useFormik({
        initialValues: {
            password: '',
        },
        validationSchema: yup.object({
            password: yup.string('enter password').required('password is required').min(8),
        }),
        onSubmit: ({ password }) => {
            dispatch({
                type: 'Saga: submit change password',
                payload: { password, token },
            });
        },
    });

    useEffect(() => {
        dispatch({ type: 'Saga: get recovery info', payload: token });
    }, [dispatch, token]);

    let el = null;
    if (status === 'error') {
        el = (
            <Alert severity="error" className={classes.boxInfo}>
                <AlertTitle>Error</AlertTitle>
                Your link is not valid or it has been expired!
            </Alert>
        );
    } else if (status === 'loading') {
        el = <div>...</div>;
    } else {
        el = (
            <form className={classes.formSignup} onSubmit={formik.handleSubmit}>
                <TextField
                    id="your-password"
                    label="Your New Password"
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
                    Submit
                </Button>
            </form>
        );
    }

    return (
        <>
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
                <Typography variant="h4" component="h1">
                    New Password
                </Typography>
            </div>
            {el}
            <Collapse in={Boolean(error)}>
                <ErrorAlert
                    className={classes.boxError}
                    title={error && error.title}
                    onClose={() => dispatch({ type: 'Reducer - recovery: clear errors' })}>
                    {error ? error.messages.map((e) => <div key={e}>{e}</div>) : null}
                </ErrorAlert>
            </Collapse>
        </>
    );
}
