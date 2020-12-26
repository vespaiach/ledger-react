import { Typography, TextField, Paper } from '@material-ui/core';
import clsx from 'clsx';
import { useFormik } from 'formik';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
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
    },
    submit: {
        margin: theme.spacing(3, 0, 8),
    },
    link: {
        display: 'block',
        margin: theme.spacing(0, 0, 2),
        textDecoration: 'none',
        color: theme.palette.text.secondary,
    },
    copyright: {
        marginTop: theme.spacing(5),
    },
}));

export default function SignIn() {
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.me.loading);
    const classes = useStyles();

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
        },
        validationSchema: yup.object({
            name: yup.string('enter name').required('name is required'),
            email: yup.string('enter email').required('email is required').email('enter a valid email'),
            password: yup.string('enter password').required('password is required').min(6),
        }),
        onSubmit: ({ email, password, name }) => {
            if (loading) {
                return;
            }

            dispatch({ type: 'Saga: sign up', payload: { name, email, password } });
        },
    });

    return (
        <AuthBasePage component="main" maxWidth="xs" imgSrc="/signup.svg">
            <Paper classes={{ root: classes.paper }} square elevation={0}>
                <Typography component="h1" variant="h3" color="secondary">
                    Sign up
                </Typography>
                <form className={classes.form} noValidate onSubmit={formik.handleSubmit}>
                    <TextField
                        fullWidth
                        id="name"
                        label="Your Name"
                        name="name"
                        autoComplete="off"
                        autoFocus
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        error={formik.touched.name && Boolean(formik.errors.name)}
                        helperText={formik.touched.name && formik.errors.name}
                    />
                    <TextField
                        fullWidth
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
                        name="password"
                        label="Password"
                        id="password"
                        autoComplete="off"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                    />
                    <LoadingButton
                        type="submit"
                        variant="contained"
                        color="primary"
                        loading={loading}
                        className={classes.submit}
                        fullWidth
                        disableElevation
                        size="large"
                    >
                        Submit
                    </LoadingButton>
                    <Copyright className={clsx(classes.link, classes.copyright)} />
                </form>
            </Paper>
        </AuthBasePage>
    );
}
