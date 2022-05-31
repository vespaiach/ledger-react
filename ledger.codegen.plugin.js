module.exports = {
  plugin: () => `

export type SigninMutationVariables = Exact<{
  username: Scalars['username_String_NotNull_minLength_3_maxLength_127_pattern_09azAZ_'];
  password: Scalars['password_String_NotNull_minLength_5_maxLength_127'];
}>;

export type SigninMutationResult = { signin: string };

export type SignoutMutationVariables = Exact<{ [key: string]: never }>;

export type SignoutMutation = { signout?: void | null };

export type GetReasonsQueryVariables = Exact<{ [key: string]: never }>;

export type GetReasonsQuery = { 
  reasons?: Maybe<Array<Partial<Reason>>>;
}

export type GetTransactionQueryVariables = Exact<{
  id: Scalars['Int'];
}>;

export type GetTransactionQueryResult = {
  transaction?: Maybe<Partial<Transaction>>
};

export type GetTransactionsQueryVariables = Exact<{
  fromDate?: Maybe<Scalars['DateTime']>;
  toDate?: Maybe<Scalars['DateTime']>;
  fromAmount?: Maybe<Scalars['Int']>;
  toAmount?: Maybe<Scalars['Int']>;
  reasons?: Maybe<Array<Scalars['String']>>;
  take?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
}>;

export type GetTransactionsQueryResult = {
  getTransactions: {
    transactions?: Maybe<Array<Partial<Transaction>>>
    total?: Maybe<number>;
    skip?: Maybe<number>;
    take?: Maybe<number>;
  }
};

export type CreateTransactionMutationVariables = Exact<{
  date: Scalars['DateTime'];
  amount: Scalars['Int'];
  reasons: Array<Maybe<Scalars['NonEmptyString']>>;
  note?: Maybe<Scalars['String']>;
}>;

export type CreateTransactionMutationResult = {
  transaction?: Maybe<Partial<Transaction>>
};

export type UpdateTransactionMutationVariables = Exact<{
  id: Scalars['Int'];
  date?: Maybe<Scalars['DateTime']>;
  amount?: Maybe<Scalars['Int']>;
  reasons?: Maybe<Array<Scalars['NonEmptyString']>>;
  note?: Maybe<Scalars['String']>;
}>;

export type UpdateTransactionMutationResult = {
  transaction?: Maybe<Partial<Transaction>>
};


export type DeleteTransactionMutationVariables = Exact<{
  id: Scalars['Int'];
}>;

export type DeleteTransactionMutationResult = { deleteTransaction?: boolean | null };

export type CreateUserMutationVariables = Exact<{
  username: Scalars['username_String_NotNull_minLength_3_maxLength_127_pattern_09azAZ_'];
  email: Scalars['EmailAddress'];
  password: Scalars['password_String_NotNull_minLength_5_maxLength_127'];
  firstName?: Maybe<Scalars['firstName_String_maxLength_127']>;
  lastName?: Maybe<Scalars['lastName_String_maxLength_127']>;
}>;

export type CreateUserMutationResult = {
  user?: Maybe<Partial<User>>
};

export type UpdateUserMutationVariables = Exact<{
  username?: InputMaybe<Scalars['username_String_minLength_3_maxLength_127_pattern_09azAZ_']>;
  email?: InputMaybe<Scalars['EmailAddress']>;
  password?: InputMaybe<Scalars['password_String_minLength_5_maxLength_127']>;
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  isActive?: InputMaybe<Scalars['Boolean']>;
}>;

export type UpdateUserMutationResult = {
  user?: Maybe<Partial<User>>
};

export type ReasonMap = Omit<Reason, 'updatedAt'> & { updatedAt: Date };
export type TransactionMap = Omit<Transaction, 'date' | 'reasons' | 'updatedAt'> & { date: Date, updatedAt: Date, reasons: ReasonMap[] };
export type MutationSaveTransactionArgs = Omit<MutationUpdateTransactionArgs, 'id'> & { id?: Maybe<number>; };

export interface GraphqlError { message: string; extensions?: { code: string; } };
export interface GraphqlResponse<T> { errors?: GraphqlError[]; data: T };
export interface FilterArgs {
  fromAmount?: Maybe<number>;
  toAmount?: Maybe<number>;
  fromDate?: Maybe<Date>;
  toDate?: Maybe<Date>;
  reasons?: Maybe<string[]>;
  skip?: Maybe<number>;
  take?: Maybe<number>;
}

export interface DataProvider {
  loadTransactions(variables?: QueryGetTransactionsArgs): Promise<{ transactions: Transaction[]; total: number; }>;
  getTransaction(id: number): Promise<Transaction | null>;
  loadReasons(): Promise<Reason[]>;

  saveTransaction(variables: MutationSaveTransactionArgs): Promise<Transaction>;
  deleteTransaction(id: number): Promise<void>;

  signin(username: string, password:string): Promise<string>;
  signout(): Promise<void>;
}
  `,
};
