import './Signin.css';

import { useEffect, useRef, useState } from 'react';
import * as emailValidator from 'email-validator';
import { useAtomValue } from 'jotai/utils';
import { useNavigate } from 'react-router-dom';
import { from } from 'rxjs';

import EmailIcon from '../components/icons/Email';
import { authAtom, signinStatusAtom } from '../store/auth';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import provider from '../store/provider';

export default function EmailInput() {
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const auth = useAtomValue(authAtom);

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

          if (!emailValidator.validate(email)) {
            setError('invalid email address');
            return;
          }

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
        }}>
        <h3>Sign-In Ledger App</h3>
        <p>A sign-in email will be sent to your email</p>
        <Input
          ref={inputRef}
          caption="email address"
          error={error}
          value={email}
          disabled={status === 'sending' || status === 'sent'}
          onChange={(e) => {
            setError(undefined);
            setEmail(e.target.value);
          }}>
          <EmailIcon />
        </Input>
        <Button type="submit" loading={status === 'sending'}>
          Send
        </Button>
      </form>
    </div>
  );
}
