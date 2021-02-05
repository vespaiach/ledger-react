import http from './http';

export function ping() {
    return http.get('/ping');
}

export function fetchTransactions(year) {
    return http.get('/transactions', {
        params: { year },
    });
}

export function syncTransactions(data) {
    return http.post('/transactions', {
        data,
    });
}

export function signin(data) {
    return http.post('/signin', { data });
}

export function signout() {
    return http.put('/signout');
}
