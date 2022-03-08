import './App.css';

import { Route, Routes, useLocation } from 'react-router-dom';
import { Suspense, useCallback, useEffect } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import TransactionList from './views/TransactionList';
import TransactionMutation from './views/TransactionMutation';
import { listenTo } from './utils/window';

export function App() {
  const location = useLocation();

  const handleEntered = () => {
    if (location.pathname !== '/') {
      document.getElementById('root')?.classList.add('backward');
    } else {
      document.getElementById('root')?.classList.remove('backward');
    }
  };

  useEffect(() => {
    return listenTo(window, 'resize', function () {
      document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}`);
    });
  }, []);

  return (
    <TransitionGroup component={null}>
      <CSSTransition key={location.key} classNames="fly" timeout={350} onEntered={handleEntered}>
        <Suspense fallback="Loading...">
          <Routes location={location}>
            <Route path=":id" element={<TransactionMutation />} />
            <Route path="/" element={<TransactionList />} />
          </Routes>
        </Suspense>
      </CSSTransition>
    </TransitionGroup>
  );
}
