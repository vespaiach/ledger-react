import create, { State, StateSelector } from 'zustand';

let i = 0;

interface StoreMessage extends AppMessage {
  id: number;
}

interface AppStore extends State {
  messages: StoreMessage[];

  addMessage: (message: AppMessage) => void;
  removeMessage: (id: number) => void;
  addError: (message: string, timeout?: number) => void;
  clear: () => void;
}

export const messagesSelector: StateSelector<AppStore, AppStore['messages']> = (state) => state.messages;
export const addMessageSelector: StateSelector<AppStore, AppStore['addMessage']> = (state) =>
  state.addMessage;
export const removeMessageSelector: StateSelector<AppStore, AppStore['removeMessage']> = (state) =>
  state.removeMessage;
export const addErrorSelector: StateSelector<AppStore, AppStore['addError']> = (state) => state.addError;
export const clear: StateSelector<AppStore, AppStore['clear']> = (state) => state.clear;

export const useAppStore = create<AppStore>((set, get) => ({
  messages: [],

  addMessage: (message) => set({ messages: get().messages.concat([{ ...message, id: ++i }]) }),
  removeMessage: (id: number) => set({ messages: get().messages.filter((m) => m.id !== id) }),
  addError: (message, timeout = 3000) =>
    set({ messages: get().messages.concat([{ id: ++i, message, type: 'error', timeout }]) }),
  clear: () => set({ messages: [] }),
}));
