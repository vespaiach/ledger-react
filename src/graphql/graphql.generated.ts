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
  __typename?: 'Query';
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

export type GetReasonsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetReasonsQuery = { __typename?: 'Query', reasons?:  Array<{ __typename?: 'Reason', id: number, text: string, updatedAt: any }> | null | undefined };

export type GetTransactionsQueryVariables = Exact<{
  fromDate?: InputMaybe<Scalars['Date']>;
  toDate?: InputMaybe<Scalars['Date']>;
  fromAmount?: InputMaybe<Scalars['Int']>;
  toAmount?: InputMaybe<Scalars['Int']>;
  reasonId?: InputMaybe<Scalars['Int']>;
  lastCursor?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
}>;


export type GetTransactionsQuery = { __typename?: 'Query', transactions?:  Array<{ __typename?: 'Transaction', id: number, amount: number, date: any, note?:  string | null | undefined, updatedAt: any, reason: { __typename?: 'Reason', id: number, text: string, updatedAt: any } }> | null | undefined };


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