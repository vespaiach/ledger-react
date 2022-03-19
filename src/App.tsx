import './Theme.css';
import './App.css';

import { Route, Routes } from 'react-router-dom';
import { Suspense, useEffect } from 'react';

import TransactionList from './views/TransactionList';
import TransactionMutation from './views/TransactionMutation';
import { listenTo } from './utils/window';
import Message from './components/Message';
import EmailInput from './views/EmailInput';
import KeyInput from './views/KeyInput';
import { useAppStore } from './store/app';

export function App() {
  const { message, setMessage } = useAppStore();

  useEffect(() => {
    return listenTo(window, 'resize', function () {
      document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}`);
    });
  }, []);

  useEffect(() => {
    /**
     * Reload page will trigger auth data hydration
     */
    return listenTo(window, 'storage', async () => {
      window.location.href = '/';
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
      {message && <Message data={message} onClose={() => setMessage(null)} />}
    </>
  );
}
