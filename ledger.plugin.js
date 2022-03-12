module.exports = {
  plugin: () => `

export type ConvertedReason = Omit<Reason, 'updatedAt'> & { updatedAt: Date };
export type ConvertedTransaction = Omit<Transaction, 'date' | 'reason' | 'updatedAt'> & { date: Date, updatedAt: Date, reason: ConvertedReason };

export interface DataProvider {
  loadTransactions(variables?: QueryGetTransactionsArgs): Promise<ConvertedTransaction[]>;
  loadReasons(): Promise<ConvertedReason[]>;

  saveTransaction(variables: Omit<MutationUpdateTransactionArgs, 'id'> & { id?: number | undefined | null }): Promise<ConvertedTransaction>;
  deleteTransaction(id: number): Promise<boolean>;

  createReason(variables?: MutationCreateReasonArgs): Promise<ConvertedReason>;
}
  `,
};
