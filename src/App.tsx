import './Theme.css';
import './App.css';

import { Route, Routes } from 'react-router-dom';
import { useUpdateAtom } from 'jotai/utils';
import { Suspense, useEffect } from 'react';
import { useAtom } from 'jotai';

import TransactionList from './views/TransactionList';
import TransactionMutation from './views/TransactionMutation';
import { listenTo } from './utils/window';
import { appMessageAtom } from './store/utils';
import Message from './components/Message';
import EmailInput from './views/EmailInput';
import KeyInput from './views/KeyInput';
import { read } from './utils/auth';
import { authAtom } from './store/auth';

export function App() {
  const setAuth = useUpdateAtom(authAtom);
  const [appMessage, setAppMessage] = useAtom(appMessageAtom);

  useEffect(() => {
    return listenTo(window, 'resize', function () {
      document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}`);
    });
  }, []);

  useEffect(() => {
    /**
     * Sign-in/sign-out other tabs
     */
    return listenTo(window, 'storage', () => {
      setAuth(read());
    });
  }, []);

  return (
    <>
      <Suspense fallback="Loading...">
        <Routes>
          <Route path="/email" element={<EmailInput />} />
          <Route path="/token" element={<KeyInput />} />
          <Route path=":id" element={<TransactionMutation />} />
          <Route path="/" element={<TransactionList />} />
        </Routes>
      </Suspense>
      {appMessage && <Message data={appMessage} onClose={() => setAppMessage(null)} />}
    </>
  );
}
