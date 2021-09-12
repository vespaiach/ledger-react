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

export type AmountInput = {
  amountFrom?: Maybe<Scalars['Float']>;
  amountTo?: Maybe<Scalars['Float']>;
};

export type DateInput = {
  dateFrom?: Maybe<Scalars['dateFrom_String_format_date']>;
  dateTo?: Maybe<Scalars['dateTo_String_format_date']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  mutateTransaction?: Maybe<Transaction>;
};


export type MutationMutateTransactionArgs = {
  input: TransactionInput;
};

export type Query = {
  __typename?: 'Query';
  reasons: Array<Maybe<Reason>>;
  transactionsByAmount: Array<Maybe<Transaction>>;
  transactionsByDate: Array<Maybe<Transaction>>;
  transactionsById?: Maybe<Transaction>;
  transactionsByReason: Array<Maybe<Transaction>>;
};


export type QueryTransactionsByAmountArgs = {
  input?: Maybe<AmountInput>;
};


export type QueryTransactionsByDateArgs = {
  input?: Maybe<DateInput>;
};


export type QueryTransactionsByIdArgs = {
  id: Scalars['Int'];
};


export type QueryTransactionsByReasonArgs = {
  reasonId: Scalars['Int'];
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

export type TransactionInput = {
  amount?: Maybe<Scalars['Float']>;
  date?: Maybe<Scalars['date_String_format_date']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  reason?: Maybe<Scalars['String']>;
};

export type GetReasonsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetReasonsQuery = { __typename?: 'Query', reasons: Array<Maybe<{ __typename?: 'Reason', id: number, text: string, updatedAt: any }>> };

export type GetTransactionsByDateQueryVariables = Exact<{
  dateInput?: Maybe<DateInput>;
}>;


export type GetTransactionsByDateQuery = { __typename?: 'Query', transactionsByDate: Array<Maybe<{ __typename?: 'Transaction', id: number, amount: number, date: any, description?: Maybe<string>, updatedAt: any, reason: { __typename?: 'Reason', id: number, text: string, updatedAt: any } }>> };

export type GetTransactionsByAmountQueryVariables = Exact<{
  amountInput?: Maybe<AmountInput>;
}>;


export type GetTransactionsByAmountQuery = { __typename?: 'Query', transactionsByAmount: Array<Maybe<{ __typename?: 'Transaction', id: number, amount: number, date: any, description?: Maybe<string>, updatedAt: any, reason: { __typename?: 'Reason', id: number, text: string, updatedAt: any } }>> };

export type GetTransactionsByReasonQueryVariables = Exact<{
  reasonId: Scalars['Int'];
}>;


export type GetTransactionsByReasonQuery = { __typename?: 'Query', transactionsByReason: Array<Maybe<{ __typename?: 'Transaction', id: number, amount: number, date: any, description?: Maybe<string>, updatedAt: any, reason: { __typename?: 'Reason', id: number, text: string, updatedAt: any } }>> };

export type GetTransactionsByIdQueryVariables = Exact<{
  transactionId: Scalars['Int'];
}>;


export type GetTransactionsByIdQuery = { __typename?: 'Query', transactionsById?: Maybe<{ __typename?: 'Transaction', id: number, amount: number, date: any, description?: Maybe<string>, updatedAt: any, reason: { __typename?: 'Reason', text: string, id: number, updatedAt: any } }> };


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
export const GetTransactionsByDateDocument = gql`
    query getTransactionsByDate($dateInput: DateInput) {
  transactionsByDate(input: $dateInput) {
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

/**
 * __useGetTransactionsByDateQuery__
 *
 * To run a query within a React component, call `useGetTransactionsByDateQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTransactionsByDateQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTransactionsByDateQuery({
 *   variables: {
 *      dateInput: // value for 'dateInput'
 *   },
 * });
 */
export function useGetTransactionsByDateQuery(baseOptions?: Apollo.QueryHookOptions<GetTransactionsByDateQuery, GetTransactionsByDateQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTransactionsByDateQuery, GetTransactionsByDateQueryVariables>(GetTransactionsByDateDocument, options);
      }
export function useGetTransactionsByDateLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTransactionsByDateQuery, GetTransactionsByDateQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTransactionsByDateQuery, GetTransactionsByDateQueryVariables>(GetTransactionsByDateDocument, options);
        }
export type GetTransactionsByDateQueryHookResult = ReturnType<typeof useGetTransactionsByDateQuery>;
export type GetTransactionsByDateLazyQueryHookResult = ReturnType<typeof useGetTransactionsByDateLazyQuery>;
export type GetTransactionsByDateQueryResult = Apollo.QueryResult<GetTransactionsByDateQuery, GetTransactionsByDateQueryVariables>;
export const GetTransactionsByAmountDocument = gql`
    query getTransactionsByAmount($amountInput: AmountInput) {
  transactionsByAmount(input: $amountInput) {
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

/**
 * __useGetTransactionsByAmountQuery__
 *
 * To run a query within a React component, call `useGetTransactionsByAmountQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTransactionsByAmountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTransactionsByAmountQuery({
 *   variables: {
 *      amountInput: // value for 'amountInput'
 *   },
 * });
 */
export function useGetTransactionsByAmountQuery(baseOptions?: Apollo.QueryHookOptions<GetTransactionsByAmountQuery, GetTransactionsByAmountQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTransactionsByAmountQuery, GetTransactionsByAmountQueryVariables>(GetTransactionsByAmountDocument, options);
      }
export function useGetTransactionsByAmountLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTransactionsByAmountQuery, GetTransactionsByAmountQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTransactionsByAmountQuery, GetTransactionsByAmountQueryVariables>(GetTransactionsByAmountDocument, options);
        }
export type GetTransactionsByAmountQueryHookResult = ReturnType<typeof useGetTransactionsByAmountQuery>;
export type GetTransactionsByAmountLazyQueryHookResult = ReturnType<typeof useGetTransactionsByAmountLazyQuery>;
export type GetTransactionsByAmountQueryResult = Apollo.QueryResult<GetTransactionsByAmountQuery, GetTransactionsByAmountQueryVariables>;
export const GetTransactionsByReasonDocument = gql`
    query getTransactionsByReason($reasonId: Int!) {
  transactionsByReason(reasonId: $reasonId) {
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

/**
 * __useGetTransactionsByReasonQuery__
 *
 * To run a query within a React component, call `useGetTransactionsByReasonQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTransactionsByReasonQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTransactionsByReasonQuery({
 *   variables: {
 *      reasonId: // value for 'reasonId'
 *   },
 * });
 */
export function useGetTransactionsByReasonQuery(baseOptions: Apollo.QueryHookOptions<GetTransactionsByReasonQuery, GetTransactionsByReasonQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTransactionsByReasonQuery, GetTransactionsByReasonQueryVariables>(GetTransactionsByReasonDocument, options);
      }
export function useGetTransactionsByReasonLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTransactionsByReasonQuery, GetTransactionsByReasonQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTransactionsByReasonQuery, GetTransactionsByReasonQueryVariables>(GetTransactionsByReasonDocument, options);
        }
export type GetTransactionsByReasonQueryHookResult = ReturnType<typeof useGetTransactionsByReasonQuery>;
export type GetTransactionsByReasonLazyQueryHookResult = ReturnType<typeof useGetTransactionsByReasonLazyQuery>;
export type GetTransactionsByReasonQueryResult = Apollo.QueryResult<GetTransactionsByReasonQuery, GetTransactionsByReasonQueryVariables>;
export const GetTransactionsByIdDocument = gql`
    query getTransactionsById($transactionId: Int!) {
  transactionsById(id: $transactionId) {
    id
    amount
    date
    description
    updatedAt
    reason {
      text
      id
      updatedAt
    }
  }
}
    `;

/**
 * __useGetTransactionsByIdQuery__
 *
 * To run a query within a React component, call `useGetTransactionsByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTransactionsByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTransactionsByIdQuery({
 *   variables: {
 *      transactionId: // value for 'transactionId'
 *   },
 * });
 */
export function useGetTransactionsByIdQuery(baseOptions: Apollo.QueryHookOptions<GetTransactionsByIdQuery, GetTransactionsByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTransactionsByIdQuery, GetTransactionsByIdQueryVariables>(GetTransactionsByIdDocument, options);
      }
export function useGetTransactionsByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTransactionsByIdQuery, GetTransactionsByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTransactionsByIdQuery, GetTransactionsByIdQueryVariables>(GetTransactionsByIdDocument, options);
        }
export type GetTransactionsByIdQueryHookResult = ReturnType<typeof useGetTransactionsByIdQuery>;
export type GetTransactionsByIdLazyQueryHookResult = ReturnType<typeof useGetTransactionsByIdLazyQuery>;
export type GetTransactionsByIdQueryResult = Apollo.QueryResult<GetTransactionsByIdQuery, GetTransactionsByIdQueryVariables>;