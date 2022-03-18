import './Signin.css';

import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAtomValue, useUpdateAtom } from 'jotai/utils';

import { exchangeStatusAtom, exchangeTokenAtom } from '../store/auth';
import PasswordIcon from '../components/icons/Password';
import { Button } from '../components/Button';
import { Input } from '../components/Input';

export default function KeyInput() {
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const [key, setKey] = useState('');
  const [error, setError] = useState<string | undefined>(undefined);

  const exchangeToken = useUpdateAtom(exchangeTokenAtom);
  const exchangeStatus = useAtomValue(exchangeStatusAtom);

  useEffect(() => {
    inputRef.current?.focus();
  }, [inputRef.current]);

  useEffect(() => {
    if (exchangeStatus === 'sent') navigate('/');
  }, [exchangeStatus]);

  return (
    <div className="full-page flex-center">
      <form
        className="sign-in"
        onSubmit={async (e) => {
          e.preventDefault();
          if (exchangeStatus === 'sending') return;

          if (!key || key.length !== 36) {
            setError('invalid sign-in key');
            return;
          }

          if (exchangeStatus !== 'sent') {
            await exchangeToken({ key });
          }
        }}>
        <h3>Sign-In Ledger App</h3>
        <p>Please enter the sign-in that has been sent to you</p>
        <Input
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
        <Button type="submit" loading={exchangeStatus === 'sending'}>
          Sign In
        </Button>
      </form>
    </div>
  );
}
