/**
 *
 * Ledger Web App Source Code.
 *
 * @license MIT
 * @copyright Toan Nguyen <nta.toan@gmail.com>
 *
 */
import qs from 'query-string';

import { HTTPResult, RemoteRepository } from '../../types.d';
import { getToken } from '../../utils/token';

const createFetchRequest = (
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  endpoint: string,
  params: { [key: string]: string | number } | null,
  tokenInclude: boolean
) => {
  const headers = new Headers({
    'Content-Type': 'application/json',
    'Accept-Charset': 'utf-8',
    'Accept-Language': 'en-US,en',
    Accept: 'application/json',
  });

  if (tokenInclude) {
    const token = getToken();
    if (token) {
      headers.append('Authorization', `Bearer ${token}`);
    }
  }

  let url = `${process.env.REACT_APP_API_ORIGIN}${endpoint}`;
  const requestBody: { [key: string]: any } = {
    method,
    headers,
  };

  if (params) {
    if (method === 'GET') {
      const qstring = qs.stringify(params);
      url += qstring ? `?${qstring}` : '';
    }

    if (method === 'POST' || method === 'PUT') {
      requestBody.body = JSON.stringify(params);
    }
  }

  return new Request(url, requestBody);
};

const handleFetchRequest = async (
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  endpoint: string,
  params: { [key: string]: string | number } | null = null,
  tokenInclude = true
): Promise<HTTPResult<any>> => {
  const request = createFetchRequest(method, endpoint, params, tokenInclude);
  const response = await fetch(request);
  const result: HTTPResult<any> = { ok: response.ok, status: response.status, data: null };
  if (response.status !== 204 && !response.bodyUsed) {
    result.data = await response.json();
  }
  return result;
};

const repo: RemoteRepository = {
  getTransactions(params) {
    return handleFetchRequest('GET', '/transactions', params);
  },

  createTransaction(params) {
    return handleFetchRequest('POST', '/transactions', params);
  },

  updateTransaction(params) {
    return handleFetchRequest('POST', '/transactions', params);
  },

  deleteTransaction(id) {
    return handleFetchRequest('DELETE', `/transactions/${id}`);
  },

  getYears(params) {
    return handleFetchRequest('GET', '/transactions/years', params);
  },

  signin(params) {
    return handleFetchRequest('POST', '/signin', params);
  },

  signout() {
    return handleFetchRequest('PUT', '/signout');
  },
};

export default repo;
