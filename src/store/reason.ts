import { atom } from 'jotai';

import { ConvertedReason } from '../graphql.generated';
import provider from './remoteDbProvider';

export const reasonLoadingAtom = atom(false);

export const reasonsAtom = atom<ConvertedReason[]>([]);
export const reasonsMapAtom = atom<Record<number, ConvertedReason>>((get) => {
  const reasons = get(reasonsAtom);
  return Object.fromEntries(reasons.map((r) => [r.id, r]));
});

export const fetchReasonsAtom = atom(
  (get) => get(reasonsAtom),
  async (_, set) => {
    set(reasonLoadingAtom, true);

    const reasons = await provider.loadReasons();

    if (reasons) {
      set(reasonsAtom, reasons);
    }

    set(reasonLoadingAtom, false);
  }
);
