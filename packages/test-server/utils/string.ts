import f from 'faker';

export function uniqName(prefix: string = '') {
  return `${prefix}${+new Date()}`;
}
