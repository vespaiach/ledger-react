import './Signin.css';

import { useState } from 'react';
import * as emailValidator from 'email-validator';
import { CSSTransition } from 'react-transition-group';

import { Input } from '../components/Input';
import EmailIcon from '../components/icons/Email';
import { useAtomValue, useUpdateAtom } from 'jotai/utils';
import { exchangeStatusAtom, exchangeTokenAtom, signinAtom, signinStatusAtom } from '../store/auth';
import PasswordIcon from '../components/icons/Password';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [key, setKey] = useState('');
  const [errors, setErrors] = useState<{ email?: string | undefined; key?: string | undefined } | null>(null);

  const sendEmail = useUpdateAtom(signinAtom);
  const exchangeToken = useUpdateAtom(exchangeTokenAtom);
  const status = useAtomValue(signinStatusAtom);
  const exchangeStatus = useAtomValue(exchangeStatusAtom);

  return (
    <div className="full-page flex-center">
      <div className="sign-in">
        <h3>Sign-In Ledger App</h3>
        <Input
          caption="email address"
          error={errors?.email}
          value={email}
          disabled={status === 'sent'}
          onChange={(e) => {
            setErrors(null);
            setEmail(e.target.value);
          }}>
          <EmailIcon />
        </Input>
        <CSSTransition in={status === 'sent'} timeout={300} classNames="key">
          <Input
            caption="sign-in key"
            className="key"
            error={errors?.key}
            value={key}
            onChange={(e) => {
              setErrors(null);
              setKey(e.target.value);
            }}>
            <PasswordIcon />
          </Input>
        </CSSTransition>
        <button
          className="button"
          onClick={async () => {
            if (status === 'sending' || exchangeStatus === 'sending') return;

            if (!emailValidator.validate(email)) {
              setErrors({ ...(errors || {}), email: 'invalid email address' });
              return;
            }

            if (status !== 'sent') {
              await sendEmail({ email });
              return;
            }

            if (!key || key.length !== 36) {
              setErrors({ ...(errors || {}), key: 'invalid sign-in key' });
              return;
            }

            await exchangeToken({ key });
            return;
          }}>
          Sign In
        </button>
      </div>
    </div>
  );
}
