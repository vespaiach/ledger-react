import create, { State, StateSelector } from 'zustand';
import { persist } from 'zustand/middleware';

import { AUTH_KEY } from '../utils/auth';

interface AuthStore extends State {
  auth: string | null;

  setAuth: (auth: string | null) => void;
}

export const setAuthSelector: StateSelector<AuthStore, AuthStore['setAuth']> = (state) => state.setAuth;
export const authSelector: StateSelector<AuthStore, AuthStore['auth']> = (state) => state.auth;

export const useAuthStore = create<AuthStore>(
  persist(
    (set, get) => ({
      auth: null,

      setAuth: (auth) => set({ auth }),
    }),
    { name: AUTH_KEY }
  )
);
