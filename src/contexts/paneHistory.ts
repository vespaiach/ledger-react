import { MemoryHistory, createMemoryHistory } from 'history';
import { createContext } from 'react';

export const PaneHistory = createContext<MemoryHistory>(createMemoryHistory());
