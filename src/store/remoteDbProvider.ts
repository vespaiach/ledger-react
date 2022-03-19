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
import { signinMutation, signoutMutation, tokenMutation } from '../graphql/auth';
import { getReasons } from '../graphql/reason';
import {
  createReasonMutation,
  createTransactionMutation,
  deleteTransactionMutation,
  getTransactionsQuery,
  updateTransactionMutation,
} from '../graphql/transaction';
import { useAuthStore } from './auth';

const url = import.meta.env.VITE_GRAPHQL_URL as string;

async function callRemote<R>(query: string, variables?: Record<string, unknown>) {
  const { auth } = useAuthStore.getState();
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (auth) {
    headers.Authorization = `Bearer ${auth}`;
  }

  const response = await fetch(url, {
    method: 'POST',
    cache: 'no-cache',
    headers,
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

  if (!result.transaction) throw new Error("couldn't save transaction");

  return result.transaction;
}

async function deleteTransaction(id: number) {
  const result = await callRemote<DeleteTransactionMutation>(deleteTransactionMutation, { id });

  if (!result.deleteTransaction) throw new Error("couldn't delete transaction");
}

async function signin(email: string) {
  const result = await callRemote<{ signin: string }>(signinMutation, { email });

  if (result.signin !== 'sent') throw new Error(result.signin);
}

async function signout() {
  return await callRemote<void>(signoutMutation);
}

async function token(key: string) {
  const result = await callRemote<{ token: string }>(tokenMutation, { key });

  if (!result.token) throw new Error("Couldn't exchange for a token");

  return result.token;
}

const provider: DataProvider = {
  loadTransactions,
  loadReasons,

  saveTransaction,
  deleteTransaction,
  createReason,

  signin,
  signout,
  token,
};

export default provider;
