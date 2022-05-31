import create, { StateSelector } from 'zustand';

interface ReasonStore {
  reasons: Tag[];

  setReasons: (reasons: Tag[]) => void;
  addReason: (reason: string) => void;
}

export const setReasonsSelector: StateSelector<ReasonStore, ReasonStore['setReasons']> = (state) =>
  state.setReasons;
export const addReasonSelector: StateSelector<ReasonStore, ReasonStore['addReason']> = (state) =>
  state.addReason;
export const reasonsSelector: StateSelector<ReasonStore, Tag[]> = (state) => state.reasons;

export const useReasonStore = create<ReasonStore>((set, get) => ({
  reasons: [],

  setReasons: (reasons) => set({ reasons }),
  addReason: (reason) => {
    if (get().reasons.every((r) => r.text !== reason)) {
      set({ reasons: [...get().reasons, { text: reason }] });
    }
  },
}));
