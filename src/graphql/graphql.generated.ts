import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
};

export type Mutation = {
  __typename?: 'Mutation';
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
  note?: Maybe<Scalars['String']>;
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
  amount?: Maybe<Scalars['Float']>;
  date?: Maybe<Scalars['Date']>;
  id: Scalars['Int'];
  note?: Maybe<Scalars['String']>;
  reasonId?: Maybe<Scalars['Int']>;
};

export type Query = {
  __typename?: 'Query';
  getReasons: Array<Maybe<Reason>>;
  getTransactions: Array<Maybe<Transaction>>;
};


export type QueryGetTransactionsArgs = {
  fromAmount?: Maybe<Scalars['Int']>;
  fromDate?: Maybe<Scalars['Date']>;
  lastCursor?: Maybe<Scalars['Int']>;
  reasonId?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
  toAmount?: Maybe<Scalars['Int']>;
  toDate?: Maybe<Scalars['Date']>;
  transactionType?: Maybe<TransactionType>;
};

export type Reason = {
  __typename?: 'Reason';
  id: Scalars['Int'];
  text: Scalars['String'];
  updatedAt: Scalars['Date'];
};

export type Transaction = {
  __typename?: 'Transaction';
  amount: Scalars['Float'];
  date: Scalars['Date'];
  id: Scalars['Int'];
  note?: Maybe<Scalars['String']>;
  reason: Reason;
  updatedAt: Scalars['Date'];
};

export enum TransactionType {
  Expense = 'Expense',
  Income = 'Income'
}

export type GetReasonsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetReasonsQuery = { __typename?: 'Query', reasons: Array<Maybe<{ __typename?: 'Reason', id: number, text: string, updatedAt: any }>> };

export type GetTransactionsQueryVariables = Exact<{
  transactionType?: Maybe<TransactionType>;
  fromDate?: Maybe<Scalars['Date']>;
  toDate?: Maybe<Scalars['Date']>;
  fromAmount?: Maybe<Scalars['Int']>;
  toAmount?: Maybe<Scalars['Int']>;
  reasonId?: Maybe<Scalars['Int']>;
  lastCursor?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
}>;


export type GetTransactionsQuery = { __typename?: 'Query', transactions: Array<Maybe<{ __typename?: 'Transaction', id: number, amount: number, date: any, note?: Maybe<string>, updatedAt: any, reason: { __typename?: 'Reason', id: number, text: string, updatedAt: any } }>> };


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
    query GetTransactions($transactionType: TransactionType, $fromDate: Date, $toDate: Date, $fromAmount: Int, $toAmount: Int, $reasonId: Int, $lastCursor: Int, $take: Int) {
  transactions: getTransactions(
    transactionType: $transactionType
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
 *      transactionType: // value for 'transactionType'
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