import { atom } from 'jotai';

import { loadReasons } from './utils';

export const reasonLoadingAtom = atom(false);

export const reasonsAtom = atom<Reason[]>([]);
export const reasonsMapAtom = atom<Record<number, Reason>>((get) => {
  const reasons = get(reasonsAtom);
  return Object.fromEntries(reasons.map((r) => [r.id, r]));
});

export const fetchReasonsAtom = atom(
  (get) => get(reasonsAtom),
  async (_, set) => {
    set(reasonLoadingAtom, true);

    const reasons = await loadReasons();

    if (reasons) {
      set(reasonsAtom, reasons);
    }

    set(reasonLoadingAtom, false);
  }
);
