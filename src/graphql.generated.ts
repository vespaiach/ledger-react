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
  dateFrom_String_format_date: any;
  dateTo_String_format_date: any;
  date_String_format_date: any;
};

export type Mutation = {
  __typename?: 'Mutation';
  mutateTransaction?: Maybe<Transaction>;
};


export type MutationMutateTransactionArgs = {
  input: TransactionInput;
};

export type Pagination = {
  __typename?: 'Pagination';
  totalPages: Scalars['Int'];
  totalRecords: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  getTotalPages: Pagination;
  reasons: Array<Maybe<Reason>>;
  transactionById?: Maybe<Transaction>;
  transactions: Array<Maybe<Transaction>>;
};


export type QueryGetTotalPagesArgs = {
  input?: Maybe<TransactionFilterInput>;
};


export type QueryTransactionByIdArgs = {
  id: Scalars['Int'];
};


export type QueryTransactionsArgs = {
  input?: Maybe<TransactionFilterInput>;
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
  description?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  reason: Reason;
  updatedAt: Scalars['Date'];
};

export type TransactionFilterInput = {
  amountFrom?: Maybe<Scalars['Float']>;
  amountTo?: Maybe<Scalars['Float']>;
  dateFrom?: Maybe<Scalars['dateFrom_String_format_date']>;
  dateTo?: Maybe<Scalars['dateTo_String_format_date']>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  reason?: Maybe<Scalars['Int']>;
};

export type TransactionInput = {
  amount?: Maybe<Scalars['Float']>;
  date?: Maybe<Scalars['date_String_format_date']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  reason?: Maybe<Scalars['String']>;
};

export type GetReasonsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetReasonsQuery = { __typename?: 'Query', reasons: Array<Maybe<{ __typename?: 'Reason', id: number, text: string, updatedAt: any }>> };

export type GetTransactionsQueryVariables = Exact<{
  transactionsInput?: Maybe<TransactionFilterInput>;
}>;


export type GetTransactionsQuery = { __typename?: 'Query', transactions: Array<Maybe<{ __typename?: 'Transaction', id: number, amount: number, date: any, description?: Maybe<string>, updatedAt: any, reason: { __typename?: 'Reason', id: number, text: string, updatedAt: any } }>> };

export type GetTotalPagesQueryVariables = Exact<{
  transactionsInput?: Maybe<TransactionFilterInput>;
}>;


export type GetTotalPagesQuery = { __typename?: 'Query', getTotalPages: { __typename?: 'Pagination', totalRecords: number, totalPages: number } };

export type MutateTransactionMutationVariables = Exact<{
  input: TransactionInput;
}>;


export type MutateTransactionMutation = { __typename?: 'Mutation', mutateTransaction?: Maybe<{ __typename?: 'Transaction', id: number, amount: number, date: any, description?: Maybe<string>, updatedAt: any, reason: { __typename?: 'Reason', id: number, text: string, updatedAt: any } }> };


export const GetReasonsDocument = gql`
    query getReasons {
  reasons {
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
    query getTransactions($transactionsInput: TransactionFilterInput) {
  transactions(input: $transactionsInput) {
    reason {
      id
      text
      updatedAt
    }
    id
    amount
    date
    description
    updatedAt
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
 *      transactionsInput: // value for 'transactionsInput'
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
export const GetTotalPagesDocument = gql`
    query getTotalPages($transactionsInput: TransactionFilterInput) {
  getTotalPages(input: $transactionsInput) {
    totalRecords
    totalPages
  }
}
    `;

/**
 * __useGetTotalPagesQuery__
 *
 * To run a query within a React component, call `useGetTotalPagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTotalPagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTotalPagesQuery({
 *   variables: {
 *      transactionsInput: // value for 'transactionsInput'
 *   },
 * });
 */
export function useGetTotalPagesQuery(baseOptions?: Apollo.QueryHookOptions<GetTotalPagesQuery, GetTotalPagesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTotalPagesQuery, GetTotalPagesQueryVariables>(GetTotalPagesDocument, options);
      }
export function useGetTotalPagesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTotalPagesQuery, GetTotalPagesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTotalPagesQuery, GetTotalPagesQueryVariables>(GetTotalPagesDocument, options);
        }
export type GetTotalPagesQueryHookResult = ReturnType<typeof useGetTotalPagesQuery>;
export type GetTotalPagesLazyQueryHookResult = ReturnType<typeof useGetTotalPagesLazyQuery>;
export type GetTotalPagesQueryResult = Apollo.QueryResult<GetTotalPagesQuery, GetTotalPagesQueryVariables>;
export const MutateTransactionDocument = gql`
    mutation mutateTransaction($input: TransactionInput!) {
  mutateTransaction(input: $input) {
    id
    amount
    date
    description
    updatedAt
    reason {
      id
      text
      updatedAt
    }
  }
}
    `;
export type MutateTransactionMutationFn = Apollo.MutationFunction<MutateTransactionMutation, MutateTransactionMutationVariables>;

/**
 * __useMutateTransactionMutation__
 *
 * To run a mutation, you first call `useMutateTransactionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMutateTransactionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [mutateTransactionMutation, { data, loading, error }] = useMutateTransactionMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useMutateTransactionMutation(baseOptions?: Apollo.MutationHookOptions<MutateTransactionMutation, MutateTransactionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MutateTransactionMutation, MutateTransactionMutationVariables>(MutateTransactionDocument, options);
      }
export type MutateTransactionMutationHookResult = ReturnType<typeof useMutateTransactionMutation>;
export type MutateTransactionMutationResult = Apollo.MutationResult<MutateTransactionMutation>;
export type MutateTransactionMutationOptions = Apollo.BaseMutationOptions<MutateTransactionMutation, MutateTransactionMutationVariables>;