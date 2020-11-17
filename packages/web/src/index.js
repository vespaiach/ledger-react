import './assets/main.css';
import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import humps from 'humps';
import { ConnectedRouter } from 'connected-react-router';

import store, { history } from './store';
import App from './App';

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
axios.defaults.withCredentials = true;

// snakecase to camelcase
axios.interceptors.request.use(
    (config) => {
        if (config.data !== null && typeof config.data === 'object') {
            config.data = humps.decamelizeKeys(config.data);
        }
        return config;
    },
    (e) => Promise.reject(e)
);

// camelcase to snakecase
axios.interceptors.response.use(
    (response) => {
        if (response.data) {
            response.data = humps.camelizeKeys(response.data);
        }
        return response;
    },
    (e) => {
        if (e.response && e.response.data) {
            e.response.data = humps.camelizeKeys(e.response.data);
        }
        return Promise.reject(e);
    }
);

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App />
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
);
