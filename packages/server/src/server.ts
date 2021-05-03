import express from 'express';
import { errorHandler, createDbContext } from './middleware';
import createRouter from './route';

const app = express();

app.use(express.json());
app.use(createDbContext);

createRouter(app);

app.use(errorHandler);

app.listen(3333);
console.log('Running server at http://localhost:3333');
