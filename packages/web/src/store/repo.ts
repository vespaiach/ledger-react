import { safeFetch } from 'just-hooks';
import { Category, RemoteRepository, Transaction } from '../types';

const repo: RemoteRepository = {
  getTransactions: (year?: number) =>
    safeFetch<Transaction[]>(`/api/transactions?year=${year || new Date().getFullYear()}`, {
      method: 'GET',
    }),

  updateTransaction: (params: Transaction) =>
    safeFetch<void>('/api/transactions', { method: 'PUT', body: JSON.stringify(params) }),

  createTransaction: (params: Omit<Transaction, 'id'>) =>
    safeFetch<Transaction>('/api/transactions', { method: 'POST', body: JSON.stringify(params) }),

  deleteTransaction: (params: number) =>
    safeFetch<void>(`/api/transactions?id=${params}`, { method: 'DELETE' }),

  getYears: () => safeFetch<number[]>(`/api/years`, { method: 'GET' }),

  getCategories: () => safeFetch<Category[]>('/api/categories', { method: 'GET' }),
};

export default repo;
