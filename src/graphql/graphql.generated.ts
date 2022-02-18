import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> =  T | null | undefined;
export type InputMaybe<T> =  T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: Date;
};

export type Mutation = {
  createReason?: Maybe<Reason>;
  createTransaction?: Maybe<Transaction>;
  deleteReason?: Maybe<Scalars['Boolean']>;
  deleteTransaction?: Maybe<Scalars['Boolean']>;
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
  reasonId: Scalars['Int'];
};


export type MutationDeleteReasonArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteTransactionArgs = {
  id: Scalars['Int'];
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
  reasonId?: InputMaybe<Scalars['Int']>;
};

export type Query = {
  getReasons?: Maybe<Array<Reason>>;
  getTransactions?: Maybe<Array<Transaction>>;
};


export type QueryGetTransactionsArgs = {
  fromAmount?: InputMaybe<Scalars['Int']>;
  fromDate?: InputMaybe<Scalars['Date']>;
  lastCursor?: InputMaybe<Scalars['Int']>;
  reasonId?: InputMaybe<Scalars['Int']>;
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

export type GetReasonsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetReasonsQuery = { reasons?:  Array<{ id: number, text: string, updatedAt: Date }> | null | undefined };

export type GetTransactionsQueryVariables = Exact<{
  fromDate?: InputMaybe<Scalars['Date']>;
  toDate?: InputMaybe<Scalars['Date']>;
  fromAmount?: InputMaybe<Scalars['Int']>;
  toAmount?: InputMaybe<Scalars['Int']>;
  reasonId?: InputMaybe<Scalars['Int']>;
  lastCursor?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
}>;


export type GetTransactionsQuery = { transactions?:  Array<{ id: number, amount: number, date: Date, note?:  string | null | undefined, updatedAt: Date, reason: { id: number, text: string, updatedAt: Date } }> | null | undefined };

export type CreateTransactionMutationVariables = Exact<{
  date: Scalars['Date'];
  amount: Scalars['Float'];
  reasonId: Scalars['Int'];
  note: InputMaybe<Scalars['String']>;
}>;


export type CreateTransactionMutation = { transaction?:  { id: number, amount: number, date: Date, note?:  string | null | undefined, updatedAt: Date, reason: { id: number, text: string, updatedAt: Date } } | null | undefined };

export type CreateReasonMutationVariables = Exact<{
  text: Scalars['String'];
}>;


export type CreateReasonMutation = { reason?:  { id: number, text: string, updatedAt: Date } | null | undefined };


export const GetReasonsDocument = gql`
    query GetReasons {
  reasons: getReasons {
    id
    text
    updatedAt
  }
}
    `;

/**
 * __useGetReasonsQuery__
 *
 * To run a query within a React component, call `useGetReasonsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetReasonsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetReasonsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetReasonsQuery(baseOptions?: Apollo.QueryHookOptions<GetReasonsQuery, GetReasonsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetReasonsQuery, GetReasonsQueryVariables>(GetReasonsDocument, options);
      }
export function useGetReasonsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetReasonsQuery, GetReasonsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetReasonsQuery, GetReasonsQueryVariables>(GetReasonsDocument, options);
        }
export type GetReasonsQueryHookResult = ReturnType<typeof useGetReasonsQuery>;
export type GetReasonsLazyQueryHookResult = ReturnType<typeof useGetReasonsLazyQuery>;
export type GetReasonsQueryResult = Apollo.QueryResult<GetReasonsQuery, GetReasonsQueryVariables>;
export const GetTransactionsDocument = gql`
    query GetTransactions($fromDate: Date, $toDate: Date, $fromAmount: Int, $toAmount: Int, $reasonId: Int, $lastCursor: Int, $take: Int) {
  transactions: getTransactions(
    fromDate: $fromDate
    toDate: $toDate
    fromAmount: $fromAmount
    toAmount: $toAmount
    reasonId: $reasonId
    lastCursor: $lastCursor
    take: $take
  ) {
    id
    amount
    date
    note
    updatedAt
    reason {
      id
      text
      updatedAt
    }
  }
}
    `;

/**
 * __useGetTransactionsQuery__
 *
 * To run a query within a React component, call `useGetTransactionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTransactionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTransactionsQuery({
 *   variables: {
 *      fromDate: // value for 'fromDate'
 *      toDate: // value for 'toDate'
 *      fromAmount: // value for 'fromAmount'
 *      toAmount: // value for 'toAmount'
 *      reasonId: // value for 'reasonId'
 *      lastCursor: // value for 'lastCursor'
 *      take: // value for 'take'
 *   },
 * });
 */
export function useGetTransactionsQuery(baseOptions?: Apollo.QueryHookOptions<GetTransactionsQuery, GetTransactionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTransactionsQuery, GetTransactionsQueryVariables>(GetTransactionsDocument, options);
      }
export function useGetTransactionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTransactionsQuery, GetTransactionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTransactionsQuery, GetTransactionsQueryVariables>(GetTransactionsDocument, options);
        }
export type GetTransactionsQueryHookResult = ReturnType<typeof useGetTransactionsQuery>;
export type GetTransactionsLazyQueryHookResult = ReturnType<typeof useGetTransactionsLazyQuery>;
export type GetTransactionsQueryResult = Apollo.QueryResult<GetTransactionsQuery, GetTransactionsQueryVariables>;
export const CreateTransactionDocument = gql`
    mutation CreateTransaction($date: Date!, $amount: Float!, $reasonId: Int!, $note: String) {
  transaction: createTransaction(
    date: $date
    amount: $amount
    reasonId: $reasonId
    note: $note
  ) {
    id
    amount
    date
    note
    updatedAt
    reason {
      id
      text
      updatedAt
    }
  }
}
    `;
export type CreateTransactionMutationFn = Apollo.MutationFunction<CreateTransactionMutation, CreateTransactionMutationVariables>;

/**
 * __useCreateTransactionMutation__
 *
 * To run a mutation, you first call `useCreateTransactionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTransactionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTransactionMutation, { data, loading, error }] = useCreateTransactionMutation({
 *   variables: {
 *      date: // value for 'date'
 *      amount: // value for 'amount'
 *      reasonId: // value for 'reasonId'
 *      note: // value for 'note'
 *   },
 * });
 */
export function useCreateTransactionMutation(baseOptions?: Apollo.MutationHookOptions<CreateTransactionMutation, CreateTransactionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTransactionMutation, CreateTransactionMutationVariables>(CreateTransactionDocument, options);
      }
export type CreateTransactionMutationHookResult = ReturnType<typeof useCreateTransactionMutation>;
export type CreateTransactionMutationResult = Apollo.MutationResult<CreateTransactionMutation>;
export type CreateTransactionMutationOptions = Apollo.BaseMutationOptions<CreateTransactionMutation, CreateTransactionMutationVariables>;
export const CreateReasonDocument = gql`
    mutation CreateReason($text: String!) {
  reason: createReason(text: $text) {
    id
    text
    updatedAt
  }
}
    `;
export type CreateReasonMutationFn = Apollo.MutationFunction<CreateReasonMutation, CreateReasonMutationVariables>;

/**
 * __useCreateReasonMutation__
 *
 * To run a mutation, you first call `useCreateReasonMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateReasonMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createReasonMutation, { data, loading, error }] = useCreateReasonMutation({
 *   variables: {
 *      text: // value for 'text'
 *   },
 * });
 */
export function useCreateReasonMutation(baseOptions?: Apollo.MutationHookOptions<CreateReasonMutation, CreateReasonMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateReasonMutation, CreateReasonMutationVariables>(CreateReasonDocument, options);
      }
export type CreateReasonMutationHookResult = ReturnType<typeof useCreateReasonMutation>;
export type CreateReasonMutationResult = Apollo.MutationResult<CreateReasonMutation>;
export type CreateReasonMutationOptions = Apollo.BaseMutationOptions<CreateReasonMutation, CreateReasonMutationVariables>;