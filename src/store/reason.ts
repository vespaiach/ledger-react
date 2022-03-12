import { atom } from 'jotai';

import { ReasonMap } from '../graphql.generated';
import provider from './remoteDbProvider';
import { loadReasons$, reportError } from './utils';

export const reasonLoadingAtom = atom(false);

export const reasonsAtom = atom<ReasonMap[]>([]);
export const reasonsMapAtom = atom<Record<number, ReasonMap>>((get) => {
  const reasons = get(reasonsAtom);
  return Object.fromEntries(reasons.map((r) => [r.id, r]));
});

export const fetchReasonsAtom = atom(
  (get) => get(reasonsAtom),
  (_, set) => {
    set(reasonLoadingAtom, true);

    loadReasons$(provider.loadReasons()).subscribe({
      next: (reasons) => {
        set(reasonsAtom, reasons);
      },
      error: (err) => {
        reportError(set, err);
      },
      complete: () => {
        set(reasonLoadingAtom, false);
      },
    });

    set(reasonLoadingAtom, false);
  }
);
