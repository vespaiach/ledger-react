import axios from 'axios';
import fetchAdapter from 'axios-fetch-adapter';

const axiosInstance = axios.create({
    baseUrl: process.env.REACT_APP_BASE_API_URL,
    mode: 'cors',
    cache: 'no-store',
    credentials: process.env.NODE_ENV === 'development' ? 'include' : 'same-origin',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
    adapter: fetchAdapter,
    settle: (resolve, _, response) => {
        resolve(response);
    },
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
    return axiosInstance.post('/transactions', {
        data,
    });
}

export function signin(data) {
    return axiosInstance.post('/signin', { data });
}

export function signout() {
    return axiosInstance.put('/signout');
}
