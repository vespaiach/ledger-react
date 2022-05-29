import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuthStore } from '../store/auth';

/**
 * Check for authentication, if not redirect to sign-in page
 */
export function useAuth() {
  const navigate = useNavigate();
  const { auth } = useAuthStore();

  useEffect(() => {
    if (!auth) {
      navigate('/signin');
    }
  }, [navigate, auth]);
}
