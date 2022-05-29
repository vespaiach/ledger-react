import './Signin.css';

import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import PasswordIcon from '../components/icons/Password';
import UserIcon from '../components/icons/UserIcon';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { signin$ } from '../dataSource';
import { addMessageSelector, useAppStore } from '../store/app';
import { setAuthSelector, useAuthStore } from '../store/auth';

export default function SignIn() {
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ username?: string; password?: string } | undefined>(undefined);

  const setAuth = useAuthStore(setAuthSelector);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="full-page flex-center">
      <form
        className="sign-in"
        onSubmit={(e) => {
          e.preventDefault();

          if (loading) return;

          let errors: Record<string, string> = {};

          if (!username) {
            errors['username'] = 'Please enter username';
            return;
          }

          if (!password) {
            errors['password'] = 'Please enter password';
            return;
          }

          if (Object.keys(errors).length > 0) {
            setErrors(errors);
            return;
          }

          setLoading(true);

          signin$(username, password).subscribe({
            error: () => {
              setLoading(false);
            },
            next: (token) => {
              setAuth(token);
            },
            complete: () => {
              navigate('/');
            },
          });
        }}>
        <h3>Sign-In Ledger App</h3>
        <p>
          Sign-in with your username and password <br />
          or sign-up for a new one
        </p>
        <Input
          addIns={<UserIcon />}
          ref={inputRef}
          caption="username"
          error={errors && errors['username']}
          value={username}
          disabled={loading}
          onChange={(e) => {
            setErrors(undefined);
            setUsername(e.target.value);
          }}
        />
        <Input
          type="password"
          addIns={<PasswordIcon />}
          ref={inputRef}
          caption="password"
          error={errors && errors['password']}
          value={password}
          disabled={loading}
          onChange={(e) => {
            setErrors(undefined);
            setPassword(e.target.value);
          }}
        />
        <Button type="submit" loading={loading}>
          Sign In
        </Button>
      </form>
    </div>
  );
}
