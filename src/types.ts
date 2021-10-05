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

export enum AppCommand {
  AddTransaction,
  EditTransaction,
  DeleteTransaction,
  SearchTransaction,
  OpenChart,
  OpenSideNavigation,
}

export type CommandFunc = (command: AppCommand, data?: unknown) => void;

export type StateValue = string | number;

export interface Pane {
  name: 'TransactionDetail' | 'TransactionForm';
  state?: Record<string, StateValue>;
  closing?: boolean;
}

export interface PaneCommonProps {
  state?: Record<string, StateValue>;
  index: number;
}
