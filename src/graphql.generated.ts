export type Maybe<T> =  T | null | undefined;
export type InputMaybe<T> =  T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: string;
  Void: void;
};

export type DailyBalance = {
  date: Scalars['String'];
  earning: Scalars['Float'];
  spending: Scalars['Float'];
};

export type Mutation = {
  createReason?: Maybe<Reason>;
  createTransaction?: Maybe<Transaction>;
  deleteReason?: Maybe<Scalars['Boolean']>;
  deleteTransaction?: Maybe<Scalars['Boolean']>;
  signin: Scalars['String'];
  signout?: Maybe<Scalars['Void']>;
  token: Scalars['String'];
  updateReason?: Maybe<Reason>;
  updateTransaction?: Maybe<Transaction>;
};


export type MutationCreateReasonArgs = {
  text: Scalars['String'];
};


export type MutationCreateTransactionArgs = {
  amount: Scalars['Float'];
  date: Scalars['Date'];
  note?: InputMaybe<Scalars['String']>;
  reasonText: Scalars['String'];
};


export type MutationDeleteReasonArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteTransactionArgs = {
  id: Scalars['Int'];
};


export type MutationSigninArgs = {
  email: Scalars['String'];
};


export type MutationTokenArgs = {
  key: Scalars['String'];
};


export type MutationUpdateReasonArgs = {
  id: Scalars['Int'];
  text: Scalars['String'];
};


export type MutationUpdateTransactionArgs = {
  amount?: InputMaybe<Scalars['Float']>;
  date?: InputMaybe<Scalars['Date']>;
  id: Scalars['Int'];
  note?: InputMaybe<Scalars['String']>;
  reasonText?: InputMaybe<Scalars['String']>;
};

export type Query = {
  getDailyBalance: Array<DailyBalance>;
  getReasons?: Maybe<Array<Reason>>;
  getTransaction?: Maybe<Transaction>;
  getTransactions?: Maybe<Array<Transaction>>;
};


export type QueryGetTransactionArgs = {
  id: Scalars['Int'];
};


export type QueryGetTransactionsArgs = {
  fromAmount?: InputMaybe<Scalars['Int']>;
  fromDate?: InputMaybe<Scalars['Date']>;
  lastCursor?: InputMaybe<Scalars['Int']>;
  reasonIds?: InputMaybe<Array<Scalars['Int']>>;
  take?: InputMaybe<Scalars['Int']>;
  toAmount?: InputMaybe<Scalars['Int']>;
  toDate?: InputMaybe<Scalars['Date']>;
};

export type Reason = {
  id: Scalars['Int'];
  text: Scalars['String'];
  updatedAt: Scalars['Date'];
};

export type Transaction = {
  amount: Scalars['Float'];
  date: Scalars['Date'];
  id: Scalars['Int'];
  note?: Maybe<Scalars['String']>;
  reason: Reason;
  updatedAt: Scalars['Date'];
};

export type SigninMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type SigninMutation = { signin: string };

export type SignoutMutationVariables = Exact<{ [key: string]: never; }>;


export type SignoutMutation = { signout?:  void | null | undefined };

export type TokenMutationVariables = Exact<{
  key: Scalars['String'];
}>;


export type TokenMutation = { token: string };

export type GetReasonsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetReasonsQuery = { reasons?:  Array<{ id: number, text: string, updatedAt: string }> | null | undefined };

export type GetTransactionsQueryVariables = Exact<{
  fromDate?: InputMaybe<Scalars['Date']>;
  toDate?: InputMaybe<Scalars['Date']>;
  fromAmount?: InputMaybe<Scalars['Int']>;
  toAmount?: InputMaybe<Scalars['Int']>;
  reasonIds?: InputMaybe<Array<Scalars['Int']> | Scalars['Int']>;
  lastCursor?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
}>;


export type GetTransactionsQuery = { transactions?:  Array<{ id: number, amount: number, date: string, note?:  string | null | undefined, updatedAt: string, reason: { id: number, text: string, updatedAt: string } }> | null | undefined };

export type GetTransactionQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type GetTransactionQuery = { transaction?:  { id: number, amount: number, date: string, note?:  string | null | undefined, updatedAt: string, reason: { id: number, text: string, updatedAt: string } } | null | undefined };

export type CreateTransactionMutationVariables = Exact<{
  date: Scalars['Date'];
  amount: Scalars['Float'];
  reasonText: Scalars['String'];
  note?: InputMaybe<Scalars['String']>;
}>;


export type CreateTransactionMutation = { transaction?:  { id: number, amount: number, date: string, note?:  string | null | undefined, updatedAt: string, reason: { id: number, text: string, updatedAt: string } } | null | undefined };

export type UpdateTransactionMutationVariables = Exact<{
  id: Scalars['Int'];
  date?: InputMaybe<Scalars['Date']>;
  amount?: InputMaybe<Scalars['Float']>;
  reasonText?: InputMaybe<Scalars['String']>;
  note?: InputMaybe<Scalars['String']>;
}>;


export type UpdateTransactionMutation = { transaction?:  { id: number, amount: number, date: string, note?:  string | null | undefined, updatedAt: string, reason: { id: number, text: string, updatedAt: string } } | null | undefined };

export type CreateReasonMutationVariables = Exact<{
  text: Scalars['String'];
}>;


export type CreateReasonMutation = { reason?:  { id: number, text: string, updatedAt: string } | null | undefined };

export type DeleteTransactionMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteTransactionMutation = { deleteTransaction?:  boolean | null | undefined };


export type ReasonMap = Omit<Reason, 'updatedAt'> & { updatedAt: Date };
export type TransactionMap = Omit<Transaction, 'date' | 'reason' | 'updatedAt'> & { date: Date, updatedAt: Date, reason: ReasonMap };
export type MutationSaveTransactionArgs = Omit<MutationUpdateTransactionArgs, 'id' | 'reasonId'> & { id?: Maybe<number>; reasonText?: Maybe<string>; };

export interface GraphqlError { message: string; extensions?: { code: string; } };
export interface GraphqlResponse<T> { errors?: GraphqlError[]; data: T };

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
  