import './App.css';

import { useAtom } from 'jotai';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { Suspense, useState } from 'react';

import TransactionList from './views/TransactionList';
import { flashMessageAtom } from './store/app';

enum Path {
  AddNew = '/transaction',
  Filter = '/filter',
  Update = '/update',
}

export function App() {
  const navigate = useNavigate();
  const [flashMessage, hideFlashMessage] = useAtom(flashMessageAtom);
  const [open, setOpen] = useState(false);

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
