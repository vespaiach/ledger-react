import './Signin.css';

import { useEffect, useRef, useState } from 'react';
import qs from 'query-string';
import { useLocation, useNavigate } from 'react-router-dom';

import PasswordIcon from '../components/icons/Password';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import BackArrowIcon from '../components/icons/BackArrow';
import { addErrorSelector, useAppStore } from '../store/app';
import { setAuthSelector, useAuthStore } from '../store/auth';
import { getToken$ } from '../dataSource';

export default function KeyInput() {
  const location = useLocation();
  const navigate = useNavigate();

  const inputRef = useRef<HTMLInputElement>(null);
  const [key, setKey] = useState(() => {
    const parse = location.search ? qs.parse(location.search) : null;
    if (parse?.key) {
      return parse.key as string;
    }
    return '';
  });
  const [error, setError] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  const addError = useAppStore(addErrorSelector);
  const setAuth = useAuthStore(setAuthSelector);

  const submit = () => {
    if (loading) return;

    if (!key || key.length !== 36) {
      addError('invalid sign-in key');
      return;
    }

    setLoading(true);
    getToken$(key).subscribe({
      next: (token) => {
        setAuth(token);
      },
      error: () => {
        setLoading(false);
      },
      complete: () => navigate('/'),
    });
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (location.search) submit();
  }, [location.search]);

  return (
    <div className="full-page flex-center">
      <Button boxLess className="sign-in-back-button" onClick={() => void navigate('/email')}>
        <BackArrowIcon />
      </Button>
      <form
        className="sign-in"
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}>
        <h3>Sign-In Ledger App</h3>
        <p>Please enter the sign-in that has been sent to you</p>
        <Input
          disabled={loading}
          ref={inputRef}
          caption="sign-in key"
          error={error}
          value={key}
          addIns={<PasswordIcon />}
          onChange={(e) => {
            setError(undefined);
            setKey(e.target.value);
          }}
        />
        <Button type="submit" loading={loading}>
          Sign In
        </Button>
      </form>
    </div>
  );
}
