import { PrismaClient, Transaction } from '@prisma/client';
import DataLoader from 'dataloader';

export type Loader = {
  loadTransactionsByCategoryIds: DataLoader<number, Transaction[]>;
};

export type RootContext = {
  prisma: PrismaClient;
  loader: Loader;
};
