import { useSelector } from 'react-redux';

import { AppState } from '../store';
import { TransactionDetail } from './TransactionDetail';
import { TransactionForm } from './TransactionForm';

const paneList = {
  TransactionDetail,
  TransactionForm,
};

export function Panes() {
  const panes = useSelector((state: AppState) => state.pane);
  return (
    <>
      {panes.map((p, i) => {
        const Comp = paneList[p.name];
        return <Comp state={p.state} index={i} key={i} />;
      })}
    </>
  );
}
