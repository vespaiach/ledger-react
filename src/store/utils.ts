import {
  InMemoryCache,
  ApolloClient,
  QueryOptions,
  DocumentNode,
  ApolloQueryResult,
} from '@apollo/client';
import { put } from '@redux-saga/core/effects';

import { appGotError } from './Shared/action';
import { SagaReturn } from './types';

const gqlClient = new ApolloClient({
  uri: process.env.GRAPHQL_API,
  cache: new InMemoryCache(),
});

export function* query<T = any>(
  q: DocumentNode,
  variables = {},
  options: Omit<QueryOptions<any>, 'query'> = { fetchPolicy: 'network-only' }
): Generator<ApolloQueryResult<T>, SagaReturn<T>, boolean> {
  try {
    // @ts-ignore
    const result: ApolloQueryResult<T> = yield gqlClient.query<T>({
      ...options,
      query: q,
      variables,
    });

    if (result.error) {
      return { error: result.error.message };
    } else {
      return { data: result.data };
    }
  } catch (e) {
    return { error: 'Network error' };
  }
}

export function* mutate(m: DocumentNode, variables = {}) {
  try {
    return gqlClient.mutate({ mutation: m, variables });
  } catch (e) {
    yield put(appGotError('Network error'));
  }
}
