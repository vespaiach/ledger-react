import f from 'faker';

export function uniqName(prefix: string = '') {
  return `${prefix}${+new Date()}`;
}

export function getSchemaName(dbUrl: string) {
  const schemaStr = dbUrl.substr(dbUrl.indexOf('?') + 1);
  const schemaArr = schemaStr.split('=');

  if (schemaArr.length === 2 && schemaArr[0] === 'schema') {
    return schemaArr[1];
  }

  return null;
}
