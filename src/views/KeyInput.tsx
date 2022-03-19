import './Signin.css';

import { useEffect, useRef, useState } from 'react';
import qs from 'query-string';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAtomValue, useUpdateAtom } from 'jotai/utils';

import { tokenStatusAtom, getTokenAtom, authAtom } from '../store/auth';
import PasswordIcon from '../components/icons/Password';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import BackArrowIcon from '../components/icons/BackArrow';

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

  const auth = useAtomValue(authAtom);
  const exchangeToken = useUpdateAtom(getTokenAtom);
  const exchangeStatus = useAtomValue(tokenStatusAtom);

  const submit = () => {
    if (exchangeStatus === 'sending') return;

    if (!key || key.length !== 36) {
      setError('invalid sign-in key');
      return;
    }

    debugger
    if (exchangeStatus !== 'sent') {
      exchangeToken({ key });
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (auth) navigate('/');
  }, [auth]);

  useEffect(() => {
    if (exchangeStatus === 'sent') navigate('/');
  }, [exchangeStatus]);

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
          disabled={exchangeStatus === 'sending' || exchangeStatus === 'sent'}
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
