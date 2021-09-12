import { InMemoryCache, ApolloClient, QueryOptions, DocumentNode } from '@apollo/client';

const gqlClient = new ApolloClient({
  uri: process.env.GRAPHQL_API,
  cache: new InMemoryCache(),
});

export const query = async (
  q: DocumentNode,
  variables = {},
  options: Omit<QueryOptions<any>, 'query'> = { fetchPolicy: 'network-only' }
) => gqlClient.query({ ...options, query: q, variables });

export const mutate = async (m: DocumentNode, variables = {}) =>
  gqlClient.mutate({ mutation: m, variables });
