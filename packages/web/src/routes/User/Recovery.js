import { Typography, TextField, Paper } from '@material-ui/core';
import clsx from 'clsx';
import { useFormik } from 'formik';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
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
    title: {
        width: '100%',
        marginBottom: theme.spacing(1),
    },
    subtitle: {
        width: '100%',
        marginBottom: theme.spacing(1),
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(2),
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

export default function Recovery() {
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
        }),
        onSubmit: ({ email, name }) => {
            if (loading) {
                return;
            }
        },
    });

    return (
        <AuthBasePage component="main" maxWidth="xs" imgSrc="/forgot.svg">
            <Paper classes={{ root: classes.paper }} square elevation={0}>
                <Typography component="div" variant="h6" color="secondary" className={classes.title}>
                    Forgot your password?
                </Typography>
                <Typography variant="subtitle1" className={classes.subtitle}>
                    Please enter you name and your email at below. A recovery email will be sent to you.
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
