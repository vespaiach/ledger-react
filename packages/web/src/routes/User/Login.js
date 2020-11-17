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
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

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

export default function SignIn({ push }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const logining = useSelector((state) => state.user.logining);
    const me = useSelector((state) => state.user.me);
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const classes = useStyles();
    const submit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (logining) {
            return;
        }

        let valid = true;
        if (!email) {
            valid = false;
            setEmailError('Please enter email');
        }
        if (!password) {
            valid = false;
            setPasswordError('Please enter password');
        }

        if (valid) {
            dispatch({ type: 'REQUEST_LOGIN', payload: { email, password } });
        }
    };

    useEffect(() => {
        if (me !== null) {
            history.push('/expenses');
        }
    }, [me, history]);

    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form className={classes.form} noValidate onSubmit={submit}>
                    <TextField
                        error={emailError.length > 0}
                        helperText={emailError}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="off"
                        autoFocus
                        value={email}
                        onChange={(evt) => {
                            setEmailError('');
                            setEmail(evt.target.value);
                        }}
                    />
                    <TextField
                        error={passwordError.length > 0}
                        helperText={passwordError}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="off"
                        value={password}
                        onChange={(evt) => {
                            setPasswordError('');
                            setPassword(evt.target.value);
                        }}
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <LoadingButton
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        loading={logining}
                        onClick={submit}
                    >
                        Sign In
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
