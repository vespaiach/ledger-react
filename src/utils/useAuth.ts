import { useAtomValue } from 'jotai/utils';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { authAtom } from '../store/auth';

/**
 * Check for authentication, if not redirect to sign-in page
 */
export function useAuth() {
  const navigate = useNavigate();
  const auth = useAtomValue(authAtom);

  useEffect(() => {
    if (!auth) {
      navigate('/email');
    }
  }, [navigate, auth]);
}
