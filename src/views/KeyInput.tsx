import './Signin.css';

import { useEffect, useRef, useState } from 'react';
import qs from 'query-string';
import { from } from 'rxjs';
import { useLocation, useNavigate } from 'react-router-dom';

import PasswordIcon from '../components/icons/Password';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import BackArrowIcon from '../components/icons/BackArrow';
import selectedProvider from '../dataSource';
import { useAppStore } from '../store/app';
import { useAuthStore } from '../store/auth';

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

  const { setError: setErrorMessage } = useAppStore();
  const { setAuth } = useAuthStore();

  const submit = () => {
    if (loading) return;

    if (!key || key.length !== 36) {
      setError('invalid sign-in key');
      return;
    }

    setLoading(true);
    from(selectedProvider.token(key)).subscribe({
      next: (token) => {
        setAuth(token) 
      },
      error: (err) => {
        setLoading(false);
        setErrorMessage(err.message, 8000);
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
      <Button className="sign-in-back-button" onClick={() => void navigate('/email')}>
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
          onChange={(e) => {
            setError(undefined);
            setKey(e.target.value);
          }}>
          <PasswordIcon />
        </Input>
        <Button type="submit" loading={loading}>
          Sign In
        </Button>
      </form>
    </div>
  );
}
