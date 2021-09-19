import {
  InMemoryCache,
  ApolloClient,
  QueryOptions,
  DocumentNode,
  ApolloQueryResult,
} from '@apollo/client';
import { put, call } from '@redux-saga/core/effects';

import { appGotError } from './Shared/action';
import { SagaReturn } from './types';

console.log(process.env);

export const gqlClient = new ApolloClient({
  uri: process.env.REACT_APP_LEDGER_GRAPHQL_API,
  cache: new InMemoryCache(),
});

export function* query<T = any>(
  q: DocumentNode,
  variables = {},
  options: Omit<QueryOptions<any>, 'query'> = { fetchPolicy: 'network-only' }
): Generator<ApolloQueryResult<T>, SagaReturn<T>, boolean> {
  try {
    // @ts-ignore
    const { error, data } = yield call(gqlClient.query, {
      ...options,
      query: q,
      variables,
    });

    if (error) {
      return { error: error.message };
    } else {
      return { data: data as T };
    }
  } catch (e) {
    console.error(e);
    return { error: 'Network error' };
  }
}

export function* mutate(m: DocumentNode, variables = {}) {
  try {
    return gqlClient.mutate({ mutation: m, variables });
  } catch (e) {
    console.error(e);
    yield put(appGotError('Network error'));
  }
}
