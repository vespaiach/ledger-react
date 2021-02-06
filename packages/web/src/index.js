import './assets/main.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@material-ui/core';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import { ConnectedRouter } from 'connected-react-router';

import App from './App';
import theme from './theme';
import store, { history } from './store/local';

ReactDOM.render(
    <Router>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <App />
                </ConnectedRouter>
            </Provider>
        </ThemeProvider>
    </Router>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();
