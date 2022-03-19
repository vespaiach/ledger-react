import './Signin.css';

import { useEffect, useRef, useState } from 'react';
import * as emailValidator from 'email-validator';
import { useNavigate } from 'react-router-dom';

import EmailIcon from '../components/icons/Email';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { getSigninKey$ } from '../dataSource';
import { addMessageSelector, addErrorSelector, useAppStore } from '../store/app';

export default function EmailInput() {
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const setErrorMessage = useAppStore(addErrorSelector);
  const addMessage = useAppStore(addMessageSelector);

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

          setLoading(true);

          getSigninKey$(email).subscribe({
            error: (err) => {
              setErrorMessage(err.message, 8000);
              setLoading(false);
            },
            complete: () => {
              addMessage({
                message: 'An email has been sent to you, please check it!',
                type: 'notification',
              });
              navigate('/token');
            },
          });
        }}>
        <h3>Sign-In Ledger App</h3>
        <p>A sign-in email will be sent to your email</p>
        <Input
          addIns={<EmailIcon />}
          ref={inputRef}
          caption="email address"
          error={error}
          value={email}
          disabled={loading}
          onChange={(e) => {
            setError(undefined);
            setEmail(e.target.value);
          }}
        />
        <Button type="submit" loading={loading}>
          Send
        </Button>
      </form>
    </div>
  );
}
