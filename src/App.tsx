import './App.css';

import { Route, Routes } from 'react-router-dom';
import { Suspense, useEffect } from 'react';

import TransactionList from './views/TransactionList';
import { listenTo } from './utils/window';

export function App() {
  useEffect(() => {
    return listenTo(window, 'resize', function () {
      document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}`);
    });
  }, []);

  return (
    <Suspense fallback="Loading...">
      <Routes>
        <Route path="/" element={<TransactionList />} />
      </Routes>
    </Suspense>
  );
}
