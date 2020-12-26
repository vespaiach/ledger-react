import {
    Avatar,
    Typography,
    TextField,
    Container,
    FormControlLabel,
    Checkbox,
    Link,
    Grid,
    Box,
} from '@material-ui/core';
import { useFormik } from 'formik';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';

import LoadingButton from '../../components/LoadingButton';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
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
            debugger;

            dispatch({ type: 'Saga: login', payload: { email, password, remember } });
        },
    });

    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form className={classes.form} noValidate onSubmit={formik.handleSubmit}>
                    <TextField
                        fullWidth
                        variant="filled"
                        size="small"
                        margin="normal"
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
                        variant="filled"
                        size="small"
                        margin="normal"
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
                        className="submit"
                        fullWidth
                        disableElevation
                        size="large"
                    >
                        Submit
                    </LoadingButton>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="#" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    );
}
