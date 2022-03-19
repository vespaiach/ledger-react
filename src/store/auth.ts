import create, { State } from 'zustand';
import { persist } from 'zustand/middleware';

import { AUTH_KEY } from '../utils/auth';

interface AuthStore extends State {
  auth: string | null;

  setAuth: (auth: string | null) => void;
}

export const useAuthStore = create<AuthStore>(
  persist(
    (set, get) => ({
      auth: null,

      setAuth: (auth) => set({ auth }),
    }),
    { name: AUTH_KEY }
  )
);
