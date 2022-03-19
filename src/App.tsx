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
import { useReasonStore } from './store/reason';
import { loadReasons$ } from './dataSource';
import { useAuthStore } from './store/auth';

export function App() {
  const auth = useAuthStore((state) => state.auth);
  const setReasons = useReasonStore((state) => state.setReasons);
  const { message, setMessage } = useAppStore();
  console.log(message);

  useEffect(() => {
    return listenTo(window, 'resize', function () {
      document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}`);
    });
  }, []);

  useEffect(() => {
    if (!auth) return;

    loadReasons$().subscribe({
      next: (reasons) => {
        setReasons(reasons.map((r) => ({ ...r, updatedAt: new Date(r.updatedAt) })));
      },
    });
  }, [auth]);

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
