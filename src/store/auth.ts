import { atom } from 'jotai';
import jwtDecode from 'jwt-decode';
import { from } from 'rxjs';

import { read, remove, write } from '../utils/auth';
import provider from './provider';
import { reportError } from './utils';

/**
 * Sync token from localstorage with store
 */
let token = read();
if (token) {
  try {
    const parsed = jwtDecode<{ email: string; exp: number }>(token);
    const expiredIn = new Date(parsed.exp * 1000);

    if (expiredIn < new Date()) {
      token = null;
    }
  } catch (e) {
    console.error(e);
  }
}

export const authAtom = atom<string | null>(token);

// export const signoutAtom = atom(
//   null,
//   (_, set) =>
//     new Promise<void>((res) => {
//       debugger;
//       set(authAtom, null);
//       set(signinStatusAtom, null);
//       set(tokenStatusAtom, null);

//       /**
//        * Local storage event doesn't fire for tabs that make changes.
//        */
//       from(provider.signout()).subscribe({
//         error: (err) => {
//           console.error(err);
//           res();
//         },
//         complete: res,
//       });
//     })
// );

// export const signinAtom = atom(null, (_, set, { email }: { email: string }) => {
//   set(signinStatusAtom, 'sending');

//   from(provider.signin(email)).subscribe({
//     next: () => {},
//     error: (err) => {
//       set(signinStatusAtom, 'error');
//       reportError(set, err, 8000);
//     },
//     complete: () => {
//       set(signinStatusAtom, 'sent');
//     },
//   });
// });

// export const getTokenAtom = atom(null, (_, set, { key }: { key: string }) => {
//   set(tokenStatusAtom, 'sending');

//   from(provider.token(key)).subscribe({
//     next: (token) => {
//       const data = jwtDecode<AuthToken>(token);
//       set(authAtom, { token, email: data.email, expiredIn: new Date(data.expiredIn) });
//       write(token);
//     },
//     error: (err) => {
//       set(tokenStatusAtom, 'error');
//       reportError(set, err, 8000);
//     },
//     complete: () => {
//       set(tokenStatusAtom, 'sent');
//     },
//   });
// });

// export const setTokenAtom = atom(null, (_, set, { token }: { token: string }) => {
//   const data = jwtDecode<AuthToken>(token);
//   set(authAtom, { token, email: data.email, expiredIn: new Date(data.expiredIn) });
// });
