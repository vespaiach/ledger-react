import { InMemoryCache, ApolloClient } from '@apollo/client';

export const gqlClient = new ApolloClient({
  uri: import.meta.env.VITE_GRAPHQL_URL as string,
  cache: new InMemoryCache(),
});
