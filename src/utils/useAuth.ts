import { useAtom } from 'jotai';
import jwtDecode from 'jwt-decode';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { authAtom } from '../store/auth';

export function useAuth() {
  const navigate = useNavigate();
  const [auth, setAuth] = useAtom(authAtom);

  useEffect(() => {
    const whoami = window.localStorage.getItem('whoami');
    if (!whoami) navigate('/email');
    else {
      try {
        const parsed = jwtDecode<{ email: string; exp: number }>(whoami);
        const expiredIn = new Date(parsed.exp * 1000);

        if (expiredIn < new Date()) {
          navigate('/email');
        } else {
          setAuth({ email: parsed.email, expiredIn, token: whoami });
        }
      } catch (e) {
        console.error(e);
      }
    }
  }, [auth === null]);

  return auth;
}
