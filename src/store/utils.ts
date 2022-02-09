import { InMemoryCache, ApolloClient } from '@apollo/client';

export const gqlClient = new ApolloClient({
  uri: process.env.REACT_APP_LEDGER_GRAPHQL_API,
  cache: new InMemoryCache(),
});
