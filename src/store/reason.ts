import create from 'zustand';

import { ReasonMap } from '../graphql.generated';

interface ReasonStore {
  reasons: ReasonMap[];
  reasonsMap: Map<number, ReasonMap> | null;

  setReasons: (reasons: ReasonMap[]) => void;
}

export const useReasonStore = create<ReasonStore>((set) => ({
  reasons: [],
  reasonsMap: null,

  setReasons: (reasons) => set({ reasons, reasonsMap: new Map(reasons.map((r) => [r.id, r])) }),
}));
