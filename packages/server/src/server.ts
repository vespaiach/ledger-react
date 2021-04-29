import express from 'express';
import { createDbContext } from './middleware';
import createRouter from './router';

const app = express();
app.use(createDbContext);
createRouter(app);
app.listen(3333);
console.log('Running server at http://localhost:3333');
