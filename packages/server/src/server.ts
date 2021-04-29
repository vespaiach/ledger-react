import { graphqlHTTP } from 'express-graphql';
import express from 'express';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { PrismaClient } from '@prisma/client';

import typeDefs from './schema';
import resolvers from './resolver';
import { RootContext } from './types';
import createLoader from './loader';

const prisma = new PrismaClient();
const context: RootContext = {
  prisma,
  loader: createLoader(prisma),
};
const app = express();

app.use(
  '/graphql',
  graphqlHTTP({
    schema: makeExecutableSchema<RootContext>({
      typeDefs,
      resolvers,
    }),
    graphiql: true,
    context,
  })
);

app.listen(3333);
console.log('Running a GraphQL API server at http://localhost:3333/graphql');
