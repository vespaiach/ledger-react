import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { LedgerAction } from '../store/types';

export function usePromiseDispatch(): <T>(action: LedgerAction) => Promise<T> {
  const dispatch = useDispatch();
  return useCallback(
    <T>(action: LedgerAction) => {
      return new Promise<T>((res, rej) => {
        action.callback = (data, error) => {
          if (error) rej(error);
          res(data as T);
        };
        dispatch(action);
      });
    },
    [dispatch]
  );
}
