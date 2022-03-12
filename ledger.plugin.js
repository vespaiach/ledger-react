module.exports = {
  plugin: () => `
export type ReasonMap = Omit<Reason, 'updatedAt'> & { updatedAt: Date };
export type TransactionMap = Omit<Transaction, 'date' | 'reason' | 'updatedAt'> & { date: Date, updatedAt: Date, reason: ReasonMap };
export type MutationSaveTransactionArgs = Omit<MutationUpdateTransactionArgs, 'id' | 'reasonId'> & { id?: number | undefined | null; reasonText?: string; };

export interface DataProvider {
  loadTransactions(variables?: QueryGetTransactionsArgs): Promise<Transaction[]>;
  loadReasons(): Promise<Reason[]>;

  saveTransaction(variables: MutationSaveTransactionArgs): Promise<Transaction>;
  deleteTransaction(id: number): Promise<boolean>;

  createReason(variables?: MutationCreateReasonArgs): Promise<Reason>;
}
  `,
};
