/**
 *
 * Ledger Web App Source Code.
 *
 * @license MIT
 * @copyright Toan Nguyen <nta.toan@gmail.com>
 *
 */
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
import {
  VisibilityOff as VisibilityOffIcon,
  Visibility as VisibilityIcon,
} from '@material-ui/icons';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { useState } from 'react';
import { AppBusyCode, AppRootState } from '../../types';
import { userSigninAction } from '../../actions/auth';

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
  const classes = useStyles();
  const dispatch = useDispatch();

  const loading = useSelector<AppRootState, boolean>(
    (state) => state.wholeApp.busyCode === AppBusyCode.Loading
  );
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      remember: false,
    },
    validationSchema: yup.object({
      email: yup.string().required('email is required').email('enter a valid email'),
      password: yup.string().required('password is required').min(8),
    }),
    onSubmit: ({ email, password }) => {
      if (!loading) {
        dispatch(userSigninAction(email, password));
      }
    },
  });

  return (
    <form className={classes.formSignup} onSubmit={formik.handleSubmit}>
      <Typography classes={{ root: classes.lineOneRoot }}>
        You haven't signed in or your session has been expired.
      </Typography>
      <Typography classes={{ root: classes.lineTwoRoot }}>Please sign in to continue.</Typography>
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
      <Button
        disabled={loading}
        variant="contained"
        color="primary"
        fullWidth
        size="large"
        type="submit">
        Submit
      </Button>
    </form>
  );
}
