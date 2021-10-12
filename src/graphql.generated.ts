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

export type MonthCount = {
  __typename?: 'MonthCount';
  count: Scalars['Int'];
  month: Scalars['Date'];
};

export type Mutation = {
  __typename?: 'Mutation';
  deleteTransaction?: Maybe<Scalars['Boolean']>;
  mutateTransaction?: Maybe<Transaction>;
};


export type MutationDeleteTransactionArgs = {
  id: Scalars['Int'];
};


export type MutationMutateTransactionArgs = {
  input: TransactionInput;
};

export type Pagination = {
  __typename?: 'Pagination';
  months: Array<Maybe<MonthCount>>;
  totalRecords: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  getPagingData: Pagination;
  reasons: Array<Maybe<Reason>>;
  transactionById?: Maybe<Transaction>;
  transactions: Array<Maybe<Transaction>>;
};


export type QueryGetPagingDataArgs = {
  input?: Maybe<TransactionCountInput>;
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

export type TransactionCountInput = {
  amountFrom?: Maybe<Scalars['Float']>;
  amountTo?: Maybe<Scalars['Float']>;
  dateFrom?: Maybe<Scalars['dateFrom_String_format_date']>;
  dateTo?: Maybe<Scalars['dateTo_String_format_date']>;
  reason?: Maybe<Scalars['Int']>;
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

export type GetPagingDataQueryVariables = Exact<{
  transactionsInput?: Maybe<TransactionCountInput>;
}>;


export type GetPagingDataQuery = { __typename?: 'Query', getPagingData: { __typename?: 'Pagination', totalRecords: number, months: Array<Maybe<{ __typename?: 'MonthCount', month: any, count: number }>> } };

export type MutateTransactionMutationVariables = Exact<{
  input: TransactionInput;
}>;


export type MutateTransactionMutation = { __typename?: 'Mutation', mutateTransaction?: Maybe<{ __typename?: 'Transaction', id: number, amount: number, date: any, description?: Maybe<string>, updatedAt: any, reason: { __typename?: 'Reason', id: number, text: string, updatedAt: any } }> };

export type DeleteTransactionMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteTransactionMutation = { __typename?: 'Mutation', deleteTransaction?: Maybe<boolean> };


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
export const GetPagingDataDocument = gql`
    query getPagingData($transactionsInput: TransactionCountInput) {
  getPagingData(input: $transactionsInput) {
    totalRecords
    months {
      month
      count
    }
  }
}
    `;

/**
 * __useGetPagingDataQuery__
 *
 * To run a query within a React component, call `useGetPagingDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPagingDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPagingDataQuery({
 *   variables: {
 *      transactionsInput: // value for 'transactionsInput'
 *   },
 * });
 */
export function useGetPagingDataQuery(baseOptions?: Apollo.QueryHookOptions<GetPagingDataQuery, GetPagingDataQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPagingDataQuery, GetPagingDataQueryVariables>(GetPagingDataDocument, options);
      }
export function useGetPagingDataLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPagingDataQuery, GetPagingDataQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPagingDataQuery, GetPagingDataQueryVariables>(GetPagingDataDocument, options);
        }
export type GetPagingDataQueryHookResult = ReturnType<typeof useGetPagingDataQuery>;
export type GetPagingDataLazyQueryHookResult = ReturnType<typeof useGetPagingDataLazyQuery>;
export type GetPagingDataQueryResult = Apollo.QueryResult<GetPagingDataQuery, GetPagingDataQueryVariables>;
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
export const DeleteTransactionDocument = gql`
    mutation deleteTransaction($id: Int!) {
  deleteTransaction(id: $id)
}
    `;
export type DeleteTransactionMutationFn = Apollo.MutationFunction<DeleteTransactionMutation, DeleteTransactionMutationVariables>;

/**
 * __useDeleteTransactionMutation__
 *
 * To run a mutation, you first call `useDeleteTransactionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTransactionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTransactionMutation, { data, loading, error }] = useDeleteTransactionMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteTransactionMutation(baseOptions?: Apollo.MutationHookOptions<DeleteTransactionMutation, DeleteTransactionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteTransactionMutation, DeleteTransactionMutationVariables>(DeleteTransactionDocument, options);
      }
export type DeleteTransactionMutationHookResult = ReturnType<typeof useDeleteTransactionMutation>;
export type DeleteTransactionMutationResult = Apollo.MutationResult<DeleteTransactionMutation>;
export type DeleteTransactionMutationOptions = Apollo.BaseMutationOptions<DeleteTransactionMutation, DeleteTransactionMutationVariables>;