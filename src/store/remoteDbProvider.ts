import {
  QueryGetTransactionsArgs,
  DataProvider,
  MutationCreateReasonArgs,
  GetTransactionsQuery,
  GetReasonsQuery,
  MutationSaveTransactionArgs,
  UpdateTransactionMutation,
  GraphqlResponse,
  CreateReasonMutation,
  DeleteTransactionMutation,
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
  const response = await fetch(url, {
    method: 'POST',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) throw new Error(response.statusText);

  const result = (await response.json()) as GraphqlResponse<R>;

  if (result.errors?.length) {
    throw new Error(result.errors.map((e) => e.message).join('\n'));
  }

  return result.data;
}

async function loadTransactions(variables: QueryGetTransactionsArgs) {
  const result = await callRemote<GetTransactionsQuery>(getTransactionsQuery, variables);

  if (!result.transactions) throw new Error("Couldn't fetch transaction list");

  return result.transactions;
}

async function loadReasons() {
  const result = await callRemote<GetReasonsQuery>(getReasons);

  if (!result.reasons) throw new Error("Couldn't fetch reason list");

  return result.reasons;
}

async function createReason(variables: MutationCreateReasonArgs) {
  const result = await callRemote<CreateReasonMutation>(createReasonMutation, variables);

  if (!result.reason) throw new Error("Couldn't create reason");

  return result.reason;
}

async function saveTransaction(variables: MutationSaveTransactionArgs) {
  const result = await callRemote<UpdateTransactionMutation>(
    variables.id ? updateTransactionMutation : createTransactionMutation,
    variables
  );

  if (!result.transaction) throw new Error("Couldn't save transaction");

  return result.transaction;
}

async function deleteTransaction(id: number) {
  const result = await callRemote<DeleteTransactionMutation>(deleteTransactionMutation, { id });

  if (!result.deleteTransaction) throw new Error("Couldn't delete transaction");
}

const provider: DataProvider = {
  loadTransactions,
  loadReasons,

  saveTransaction,
  deleteTransaction,
  createReason,
};

export default provider;
