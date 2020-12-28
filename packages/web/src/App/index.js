import { Route, Redirect, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CssBaseline, Snackbar, ThemeProvider, createMuiTheme } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

import APIErrorModal from '../components/APIErrorModal';
import Login from '../routes/User/Login';
import Signup from '../routes/User/Signup';
import BasePage from './BasePage';
import Recovery from '../routes/User/Recovery';
import NotFound from '../routes/Errors/NotFound';

const theme = createMuiTheme({
    typography: {
        fontFamily: 'Encode Sans Expanded, sans-serif',
    },
    palette: {
        common: { black: '#000', white: '#fff' },
        background: { paper: '#fff', default: '#fff' },
        primary: {
            light: 'rgba(142, 172, 187, 1)',
            main: 'rgba(96, 125, 139, 1)',
            dark: 'rgba(52, 81, 94, 1)',
            contrastText: '#fff',
        },
        secondary: {
            light: 'rgba(188, 156, 141, 1)',
            main: 'rgba(139, 110, 96, 1)',
            dark: 'rgba(93, 67, 54, 1)',
            contrastText: '#fff',
        },
        error: {
            light: '#e57373',
            main: '#f44336',
            dark: '#d32f2f',
            contrastText: '#fff',
        },
        text: {
            primary: 'rgba(0, 0, 0, 0.87)',
            secondary: 'rgba(0, 0, 0, 0.54)',
            disabled: 'rgba(0, 0, 0, 0.38)',
            hint: 'rgba(0, 0, 0, 0.38)',
        },
    },
});

function App() {
    const apiError = useSelector((state) => state.app.apiError);
    const flashMessage = useSelector((state) => state.app.flashMessage || {});
    const emergeFlashMessage = flashMessage.severity !== undefined && flashMessage.message !== undefined;

    const dispatch = useDispatch();
    const close = () => dispatch({ type: 'CLEAR_API_ERROR' });

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <APIErrorModal
                code={apiError ? apiError.code : null}
                messages={apiError ? apiError.messages : []}
                open={apiError !== null}
                onClose={close}
            />

            <Snackbar
                open={emergeFlashMessage}
                autoHideDuration={flashMessage.timeout}
                onClose={() =>
                    dispatch({
                        type: 'Reducer - app: clear flash message',
                    })
                }
            >
                <Alert severity={flashMessage.severity}>{flashMessage.message}</Alert>
            </Snackbar>

            <Switch>
                <Route exact path="/">
                    <Redirect to="/portal/reports" />
                </Route>
                <Route path="/portal">
                    <BasePage />
                </Route>
                <Route exact path="/login">
                    <Login />
                </Route>
                <Route exact path="/signup">
                    <Signup />
                </Route>
                <Route exact path="/login">
                    <Login />
                </Route>
                <Route exact path="/recovery">
                    <Recovery />
                </Route>
                <Route>
                    <NotFound />
                </Route>
            </Switch>
        </ThemeProvider>
    );
}

export default App;
