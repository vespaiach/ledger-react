export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
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
  /** The `BigInt` scalar type represents non-fractional signed whole numeric values. */
  BigInt: any;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: string;
  /** A field whose value conforms to the standard internet email address format as specified in RFC822: https://www.w3.org/Protocols/rfc822/. */
  EmailAddress: string;
  /** A string that cannot be passed as an empty value */
  NonEmptyString: string;
  /** Represents NULL values */
  Void: void;
  firstName_String_maxLength_127: string;
  lastName_String_maxLength_127: string;
  password_String_NotNull_minLength_5_maxLength_127: string;
  password_String_minLength_5_maxLength_127: string;
  username_String_NotNull_minLength_3_maxLength_127_pattern_09azAZ_: string;
  username_String_minLength_3_maxLength_127_pattern_09azAZ_: string;
};

export type Mutation = {
  createTransaction?: Maybe<Transaction>;
  createUser?: Maybe<User>;
  deleteTransaction?: Maybe<Scalars['Boolean']>;
  signin: Scalars['String'];
  signout?: Maybe<Scalars['Void']>;
  updateTransaction?: Maybe<Transaction>;
  updateUser?: Maybe<User>;
};


export type MutationCreateTransactionArgs = {
  amount: Scalars['BigInt'];
  date: Scalars['DateTime'];
  note?: InputMaybe<Scalars['String']>;
  reasons: Array<Scalars['NonEmptyString']>;
};


export type MutationCreateUserArgs = {
  email: Scalars['EmailAddress'];
  firstName?: InputMaybe<Scalars['firstName_String_maxLength_127']>;
  lastName?: InputMaybe<Scalars['lastName_String_maxLength_127']>;
  password: Scalars['password_String_NotNull_minLength_5_maxLength_127'];
  username: Scalars['username_String_NotNull_minLength_3_maxLength_127_pattern_09azAZ_'];
};


export type MutationDeleteTransactionArgs = {
  id: Scalars['Int'];
};


export type MutationSigninArgs = {
  password: Scalars['password_String_NotNull_minLength_5_maxLength_127'];
  username: Scalars['username_String_NotNull_minLength_3_maxLength_127_pattern_09azAZ_'];
};


export type MutationUpdateTransactionArgs = {
  amount?: InputMaybe<Scalars['BigInt']>;
  date?: InputMaybe<Scalars['DateTime']>;
  id: Scalars['Int'];
  note?: InputMaybe<Scalars['String']>;
  reasons?: InputMaybe<Array<Scalars['NonEmptyString']>>;
};


export type MutationUpdateUserArgs = {
  email?: InputMaybe<Scalars['EmailAddress']>;
  firstName?: InputMaybe<Scalars['String']>;
  isActive?: InputMaybe<Scalars['Boolean']>;
  lastName?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['password_String_minLength_5_maxLength_127']>;
  username?: InputMaybe<Scalars['username_String_minLength_3_maxLength_127_pattern_09azAZ_']>;
};

export type Query = {
  getReasons?: Maybe<Array<Reason>>;
  getTransaction?: Maybe<Transaction>;
  getTransactions?: Maybe<TransactionsResponse>;
};


export type QueryGetTransactionArgs = {
  id: Scalars['Int'];
};


export type QueryGetTransactionsArgs = {
  fromAmount?: InputMaybe<Scalars['BigInt']>;
  fromDate?: InputMaybe<Scalars['DateTime']>;
  reasons?: InputMaybe<Array<Scalars['String']>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  toAmount?: InputMaybe<Scalars['BigInt']>;
  toDate?: InputMaybe<Scalars['DateTime']>;
};

export type Reason = {
  id: Scalars['Int'];
  text: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type Transaction = {
  amount: Scalars['BigInt'];
  date: Scalars['DateTime'];
  id: Scalars['Int'];
  note?: Maybe<Scalars['String']>;
  reasons: Array<Reason>;
  updatedAt: Scalars['DateTime'];
};

export type TransactionsResponse = {
  skip: Scalars['Int'];
  take: Scalars['Int'];
  total: Scalars['Int'];
  transactions: Array<Transaction>;
};

export type User = {
  email: Scalars['String'];
  firstName?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  isActive: Scalars['Boolean'];
  lastName?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
  username: Scalars['String'];
};



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
  