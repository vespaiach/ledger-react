import { atom } from 'jotai';

import {
  GetReasonsDocument,
  GetReasonsQuery,
  GetReasonsQueryVariables,
  Reason,
} from '../graphql/graphql.generated';

import { gqlClient } from './utils';

export const reasonAtom = atom<string | null>(null);
export const reasonsAtom = atom<Reason[] | null>(null);

export const fetchReasonsAtom = atom(
  (get) => get(reasonsAtom),
  async (_, set) => {
    try {
      const { error, data } = await gqlClient.query<GetReasonsQuery, GetReasonsQueryVariables>({
        query: GetReasonsDocument,
      });

      if (!error && data) {
        set(reasonsAtom, data.reasons ?? []);
      }
    } catch (e) {
      console.error(e);
    }
  }
);
