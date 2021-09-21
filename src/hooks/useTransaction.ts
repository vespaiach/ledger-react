import { Maybe } from 'graphql/jsutils/Maybe';
import { useSelector } from 'react-redux';

import { AppState } from '../store';
import { StateValue } from '../types';

export function useTransaction(id: Maybe<StateValue>) {
  const transactions = useSelector((state: AppState) => state.transaction);

  if (id !== null && id !== undefined) {
    let num = typeof id === 'string' ? parseInt(id) : id;

    return !isNaN(num)
      ? typeof transactions.lookup[num] === 'number'
        ? transactions.data[transactions.lookup[num]]
        : null
      : null;
  }

  return null;
}
