export const TOKEN_NAME = '__tk__';

export function storeToken(token) {
    localStorage.setItem(TOKEN_NAME, token);
}

export function clearToken() {
    localStorage.removeItem(TOKEN_NAME);
}

export function getToken() {
    return localStorage.getItem(TOKEN_NAME);
}
