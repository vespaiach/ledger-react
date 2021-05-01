import http from 'http';
import { ResponseData } from '../types';

const commonOption = {
  hostname: 'localhost',
  port: 3333,
  headers: {
    'Content-Type': 'application/json',
  },
};

export function request<T>(
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  endpoint: string,
  data?: Record<string, unknown>
): Promise<ResponseData<T>> {
  return new Promise((resolve, reject) => {
    let chunks = '';

    const req = http.request(
      {
        ...commonOption,
        path: endpoint,
        method,
        timeout: 3000,
      },
      (res) => {
        res.setEncoding('utf8');
        res.on('data', (chunk) => {
          chunks += chunk;
        });
        res.on('end', () => {
          try {
            resolve({
              statusCode: res.statusCode,
              ...JSON.parse(chunks),
            });
          } catch (err) {
            reject("Couldn't parse JSON response");
          }
        });
        res.statusCode;
      }
    );

    req.on('error', (err) => {
      reject(err);
    });

    req.on('timeout', () => {
      reject('timeout');
    });

    if (method !== 'GET' && data) {
      req.write(JSON.stringify(data));
    }

    req.end();
  });
}
