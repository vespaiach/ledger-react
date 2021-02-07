/**
 *
 * Ledger Web App Source Code.
 *
 * @license MIT
 * @copyright Toan Nguyen <nta.toan@gmail.com>
 *
 */

import axios from 'axios/lib/axios';
import fetchAdapter from 'axios-fetch-adapter';
import { getToken } from '../utils/token';

/**
 * Axios uses xhr adapter by default. In order to leverage service worker for caching, fetch adapter is used instead
 */
const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BASE_API_URL,
    mode: 'cors',
    cache: 'no-store',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
    adapter: fetchAdapter,
    settle: (resolve, _, response) => {
        resolve(response);
    },
});

/**
 * Add authorization header if credentials is not set to 'omit'
 */
axiosInstance.interceptors.request.use(function (config) {
    if (config.credentials === 'omit') {
        return config;
    }

    config.headers['Authorization'] = `Bearer ${getToken()}`;
    return config;
});

export default axiosInstance;

export function ping() {
    return axiosInstance.get('/ping');
}

export function fetchTransactions(year) {
    return axiosInstance.get('/transactions', {
        params: { year },
    });
}

export function syncTransactions(data) {
    return axiosInstance.post('/transactions', data);
}

export function signin(data) {
    return axiosInstance.post('/signin', data);
}

export function signout() {
    return axiosInstance.put('/signout');
}
