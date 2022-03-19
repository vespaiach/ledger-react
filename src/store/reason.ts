import create, { StateSelector } from 'zustand';

import { ReasonMap } from '../graphql.generated';

interface ReasonStore {
  reasons: ReasonMap[];
  reasonsMap: Map<number, ReasonMap> | null;

  setReasons: (reasons: ReasonMap[]) => void;
}

export const reasonsSelector: StateSelector<ReasonStore, ReasonMap[]> = (state) => state.reasons;
export const reasonsMapSelector: StateSelector<ReasonStore, Map<number, ReasonMap> | null> = (state) =>
  state.reasonsMap;

export const useReasonStore = create<ReasonStore>((set) => ({
  reasons: [],
  reasonsMap: null,

  setReasons: (reasons) => set({ reasons, reasonsMap: new Map(reasons.map((r) => [r.id, r])) }),
}));
