import fs from 'fs';
import path from 'path';
import { exec, initDbConnection } from './db';

export default async function createSchema(connectionString?: string) {
  if (connectionString) {
    initDbConnection(connectionString);
  }
  const sql = fs.readFileSync(path.join(process.cwd(), 'fixtures', 'schema.sql'), {
    encoding: 'utf-8',
  });

  await exec(sql);
}
