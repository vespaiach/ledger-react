import {
  QueryGetTransactionsArgs,
  DataProvider,
  MutationSaveTransactionArgs,
  GraphqlResponse,
  Query,
  Maybe,
  Transaction,
  Reason,
  GetTransactionQueryResult,
  GetTransactionsQueryResult,
  SigninMutationVariables,
  SigninMutationResult,
} from '../graphql.generated';
import { signinMutation, signoutMutation } from '../graphql/auth';
import { getReasons } from '../graphql/reason';
import {
  createTransactionMutation,
  deleteTransactionMutation,
  getTransactionQuery,
  getTransactionsQuery,
  updateTransactionMutation,
} from '../graphql/transaction';
import { useAuthStore } from '../store/auth';
import { UnauthenticationError } from '../utils/AuthError';

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
    let mes = '';
    let prefix = '';

    result.errors.forEach((er) => {
      if (er.extensions?.code === 'UNAUTHENTICATED') {
        throw new UnauthenticationError(er.message);
      } else {
        mes += prefix + er.message;
        prefix = '\n';
      }
    });

    throw new Error(mes);
  }

  return result.data;
}

async function getTransaction(id: number) {
  const result = await callRemote<GetTransactionQueryResult>(getTransactionQuery, { id });

  if (result.transaction) {
    return result.transaction as Transaction;
  }

  return null;
}

async function loadTransactions(variables: QueryGetTransactionsArgs) {
  const result = await callRemote<GetTransactionsQueryResult>(getTransactionsQuery, variables);

  if (!result.getTransactions) throw new Error("Couldn't fetch transaction list");

  return {
    transactions: result.getTransactions.transactions as Array<Transaction>,
    total: result.getTransactions.total as number,
  };
}

async function loadReasons() {
  const result = await callRemote<{ reasons: Query['getReasons'] }>(getReasons);

  if (result && !result.reasons) throw new Error("Couldn't fetch reason list");

  return result.reasons as Reason[];
}

async function saveTransaction(variables: MutationSaveTransactionArgs) {
  const result = await callRemote<{ transaction: Transaction }>(
    variables.id ? updateTransactionMutation : createTransactionMutation,
    variables
  );

  if (result && !result.transaction) throw new Error("couldn't save transaction");

  return result.transaction;
}

async function deleteTransaction(id: number) {
  const result = await callRemote<{ deleteTransaction: Maybe<string> }>(deleteTransactionMutation, { id });

  if (!result.deleteTransaction) throw new Error("couldn't delete transaction");
}

async function signin(username: string, password: string) {
  const result = await callRemote<SigninMutationResult>(signinMutation, { username, password });

  if (!result.signin) throw new Error(result.signin);

  return result.signin;
}

async function signout() {
  return await callRemote<void>(signoutMutation);
}

const provider: DataProvider = {
  getTransaction,
  loadTransactions,
  loadReasons,

  saveTransaction,
  deleteTransaction,

  signin,
  signout,
};

export default provider;
