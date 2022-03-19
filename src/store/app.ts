import create, { State } from 'zustand';

interface AppStore extends State {
  message: AppMessage | null;

  setMessage: (message: AppMessage | null) => void;
  setError: (message: string, timeout?: number) => void;
}

export const useAppStore = create<AppStore>((set) => ({
  message: null,

  setMessage: (message) => set({ message }),
  setError: (message, timeout = 3000) => set({ message: { message, type: 'error', timeout } }),
}));
