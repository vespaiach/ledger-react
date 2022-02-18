import { AlertColor } from '@mui/lab';
import { atom } from 'jotai';

export const flashMessageAtom = atom<{ message: string; type: AlertColor } | null>(null);
