import {
  Reason,
  QueryGetTransactionsArgs,
  DataProvider,
  MutationCreateReasonArgs,
  GetTransactionsQuery,
  GetReasonsQuery,
  MutationSaveTransactionArgs,
  UpdateTransactionMutation,
  Transaction,
} from '../graphql.generated';
import { getReasons } from '../graphql/reason';
import {
  createReasonMutation,
  createTransactionMutation,
  deleteTransactionMutation,
  getTransactionsQuery,
  updateTransactionMutation,
} from '../graphql/transaction';

const url = import.meta.env.VITE_GRAPHQL_URL as string;

async function callRemote<R>(query: string, variables?: Record<string, unknown>) {
  const response = fetch(url, {
    method: 'POST',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query, variables }),
  });

  return (await response).json() as Promise<R>;
}

async function loadTransactions(variables: QueryGetTransactionsArgs) {
  const result = await callRemote<{ data: GetTransactionsQuery }>(getTransactionsQuery, variables);
  return result.data.transactions ?? [];
}

async function loadReasons() {
  return (await callRemote<{ data: GetReasonsQuery }>(getReasons)).data.reasons ?? [];
}

function createReason(variables: MutationCreateReasonArgs) {
  return callRemote<Reason>(createReasonMutation, variables);
}

async function saveTransaction(variables: MutationSaveTransactionArgs) {
  return (
    await callRemote<{ data: UpdateTransactionMutation }>(
      variables.id ? updateTransactionMutation : createTransactionMutation,
      variables
    )
  ).data.transaction as Transaction;
}

export function deleteTransaction(id: number) {
  return callRemote<boolean>(deleteTransactionMutation, { id });
}

const provider: DataProvider = {
  loadTransactions,
  loadReasons,

  saveTransaction,
  deleteTransaction,
  createReason,
};

export default provider;
