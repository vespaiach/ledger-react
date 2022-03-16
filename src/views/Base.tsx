import { useAtom } from 'jotai';
import jwtDecode from 'jwt-decode';
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import PageLoader from '../components/PageLoader';
import SignIn from '../views/SignIn';

import { authAtom } from '../store/auth';

export default function Base() {
  const [auth, setAuth] = useAtom(authAtom);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const whoami = window.localStorage.getItem('whoami');
    if (whoami) {
      const parsed = jwtDecode<{ email: string; exp: number }>(whoami);
      setAuth({ email: parsed.email, expiredIn: new Date(parsed.exp * 1000), token: whoami });
    }

    setLoading(false);
  }, []);

  if (loading) return <PageLoader />;

  if (!auth || auth.expiredIn < new Date()) return <SignIn />;

  return <Outlet />;
}
