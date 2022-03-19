export const AUTH_KEY = 'whoami';

export const read = () => window.localStorage.getItem(AUTH_KEY);
export const write = (auth: string) => {
  window.localStorage.setItem(AUTH_KEY, auth);
};
export const remove = () => {
  window.localStorage.removeItem(AUTH_KEY);
};
