import './App.css';

import { useAtom } from 'jotai';
import { Route, Routes } from 'react-router-dom';
import { Suspense } from 'react';

import TransactionList from './views/TransactionList';

export function App() {
  return (
    <Suspense fallback="Loading...">
      <Routes>
        {/* <Route path="/filter" element={<FilterInput />} />
        <Route path="/transaction" element={<CreateOrUpdateTransaction />} />
        <Route path="/transaction/:id" element={<CreateOrUpdateTransaction />} /> */}
        <Route path="/" element={<TransactionList />} />
      </Routes>
    </Suspense>
  );
}
