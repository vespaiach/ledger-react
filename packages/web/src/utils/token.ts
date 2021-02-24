/**
 *
 * Ledger Web App Source Code.
 *
 * @license MIT
 * @copyright Toan Nguyen <nta.toan@gmail.com>
 *
 */

/**
 *
 * Save bearer token to local storage
 */

export function setToken(token: string): Promise<boolean> {
    return new Promise((res) => {
        try {
            localStorage.setItem('__sig', token);
            res(true);
        } catch (e) {
            res(false);
        }
    });
}

export function clearToken() {
    localStorage.removeItem('__sig');
}

export function getToken() {
    return localStorage.getItem('__sig');
}
