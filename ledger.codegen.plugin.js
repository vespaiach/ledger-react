module.exports = {
  plugin: () => `
export type ReasonMap = Omit<Reason, 'updatedAt'> & { updatedAt: Date };
export type TransactionMap = Omit<Transaction, 'date' | 'reason' | 'updatedAt'> & { date: Date, updatedAt: Date, reason: ReasonMap };
export type MutationSaveTransactionArgs = Omit<MutationUpdateTransactionArgs, 'id' | 'reasonId'> & { id?: Maybe<number>; reasonText?: Maybe<string>; };

export interface GraphqlError { message: string; extensions?: { code: string; } };
export interface GraphqlResponse<T> { errors?: GraphqlError[]; data: T };
export interface FilterArgs {
  fromAmount?: Maybe<number>;
  toAmount?: Maybe<number>;
  fromDate?: Maybe<Date>;
  toDate?: Maybe<Date>;
  reasonIds?: Maybe<number[]>;
}

export interface DataProvider {
  loadTransactions(variables?: QueryGetTransactionsArgs): Promise<Transaction[]>;
  loadReasons(): Promise<Reason[]>;

  saveTransaction(variables: MutationSaveTransactionArgs): Promise<Transaction>;
  deleteTransaction(id: number): Promise<void>;

  createReason(variables?: MutationCreateReasonArgs): Promise<Reason>;

  signin(email: string): Promise<void>;
  token(key: string): Promise<string>;
  signout(): Promise<void>;
}
  `,
};
