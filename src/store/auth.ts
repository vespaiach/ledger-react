import { atom } from 'jotai';
import jwtDecode from 'jwt-decode';
import { from } from 'rxjs';

import provider from './provider';
import { reportError } from './utils';

export const authAtom = atom<AuthToken | null>(null);
export const signinStatusAtom = atom<null | 'sending' | 'sent' | 'error'>(null);
export const exchangeStatusAtom = atom<null | 'sending' | 'sent' | 'error'>(null);

export const signoutAtom = atom(null, (_, set) => {
  set(authAtom, null);
  window.localStorage.removeItem('whoami');

  from(provider.signout()).subscribe({
    error: (err) => {
      console.error(err);
    },
  });
});

export const signinAtom = atom(null, (_, set, { email }: { email: string }) => {
  set(signinStatusAtom, 'sending');

  from(provider.signin(email)).subscribe({
    next: () => {},
    error: (err) => {
      set(signinStatusAtom, 'error');
      reportError(set, err, 8000);
    },
    complete: () => {
      set(signinStatusAtom, 'sent');
    },
  });
});

export const exchangeTokenAtom = atom(null, (_, set, { key }: { key: string }) => {
  set(exchangeStatusAtom, 'sending');

  from(provider.token(key)).subscribe({
    next: (token) => {
      const data = jwtDecode<AuthToken>(token);
      set(authAtom, { token, email: data.email, expiredIn: new Date(data.expiredIn) });
      window.localStorage.setItem('whoami', token);
    },
    error: (err) => {
      set(exchangeStatusAtom, 'error');
      reportError(set, err, 8000);
    },
    complete: () => {
      set(exchangeStatusAtom, 'sent');
    },
  });
});
