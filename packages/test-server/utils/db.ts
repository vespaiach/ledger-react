import { Pool, QueryConfig } from 'pg';

let pool: Pool = new Pool();

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

export function initDbConnection(connectionString: string) {
  pool = new Pool({
    connectionString,
  });
}

export type DatabaseResponse<T> = {
  rows: T[];
  rowCount: number;
};

export function exec<T>(command: string | QueryConfig) {
  return new Promise<DatabaseResponse<T>>((resolve, reject) => {
    pool.connect((err, client, done) => {
      if (err) {
        reject(err);
        return;
      }

      client.query(command, (err, res) => {
        done();

        if (err) {
          reject(err);
        } else {
          resolve(res as DatabaseResponse<T>);
        }
      });
    });
  });
}

export function release() {
  if (pool) {
    pool.end();
  }
}
