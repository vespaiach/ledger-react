import { Maybe } from 'graphql/jsutils/Maybe';
import { History as MemoryHistory } from 'history';

export interface TransactionModel {
  id?: number;
  amount?: number;
  date?: Date;
  description?: string;
  updatedAt?: Date;
  reason?: ReasonModel;
}

export interface ReasonModel {
  id?: number;
  text?: string;
  updatedAt?: Date;
}

export interface NetworkState<T> {
  fetching: boolean;
  error: Maybe<string>;
  data: Maybe<T>;
}

export enum AppCommand {
  AddTransaction,
  EditTransaction,
  DeleteTransaction,
  SearchTransaction,
  OpenChart,
  OpenSideNavigation,
}

export type CommandFunc = (command: AppCommand, data?: unknown) => void;

export interface CommonPaneProps {
  onClose: (...args: unknown[]) => void;
  history: MemoryHistory
}
