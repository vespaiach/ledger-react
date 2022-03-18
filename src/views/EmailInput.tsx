import './Signin.css';

import { useEffect, useRef, useState } from 'react';
import * as emailValidator from 'email-validator';
import { useAtomValue, useUpdateAtom } from 'jotai/utils';
import { useNavigate } from 'react-router-dom';

import EmailIcon from '../components/icons/Email';
import { signinAtom, signinStatusAtom } from '../store/auth';
import { Button } from '../components/Button';
import { Input } from '../components/Input';

export default function EmailInput() {
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | undefined>(undefined);

  const sendEmail = useUpdateAtom(signinAtom);
  const status = useAtomValue(signinStatusAtom);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (status === 'sent') navigate('/token');
  }, [status]);

  return (
    <div className="full-page flex-center">
      <form
        className="sign-in"
        onSubmit={async (e) => {
          e.preventDefault();

          if (status === 'sending') return;

          if (!emailValidator.validate(email)) {
            setError('invalid email address');
            return;
          }

          if (status !== 'sent') {
            await sendEmail({ email });
            navigate('/token');
          }
        }}>
        <h3>Sign-In Ledger App</h3>
        <p>A sign-in email will be sent to your email</p>
        <Input
          ref={inputRef}
          caption="email address"
          error={error}
          value={email}
          disabled={status === 'sent'}
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
