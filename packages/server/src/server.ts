import express from 'express';
import { createDbContext } from './middleware';

const app = express();
app.use(createDbContext)
app.listen(3333);
console.log('Running a GraphQL API server at http://localhost:3333/graphql');
