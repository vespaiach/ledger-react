module.exports = {
  plugin: () => `
export type ReasonMap = Omit<Reason, 'updatedAt'> & { updatedAt: Date };
export type TransactionMap = Omit<Transaction, 'date' | 'reason' | 'updatedAt'> & { date: Date, updatedAt: Date, reason: ReasonMap };
export type MutationSaveTransactionArgs = Omit<MutationUpdateTransactionArgs, 'id' | 'reasonId'> & { id?: number | undefined | null; reasonText?: string; };

export interface GraphqlError { message: string; extensions?: { code: string; } };
export interface GraphqlResponse<T> { errors?: GraphqlError[]; data: T };

export interface DataProvider {
  loadTransactions(variables?: QueryGetTransactionsArgs): Promise<Transaction[]>;
  loadReasons(): Promise<Reason[]>;

  saveTransaction(variables: MutationSaveTransactionArgs): Promise<Transaction>;
  deleteTransaction(id: number): Promise<void>;

  createReason(variables?: MutationCreateReasonArgs): Promise<Reason>;
}
  `,
};
