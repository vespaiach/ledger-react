import { atom } from 'jotai';

import {
  GetReasonsDocument,
  GetReasonsQuery,
  GetReasonsQueryVariables,
  Reason,
} from '../graphql/graphql.generated';

import { gqlClient } from './utils';

export const reasonLoadingAtom = atom(false);
export const reasonCreatingAtom = atom(false);

export const reasonsAtom = atom<Reason[]>([]);

export const fetchReasonsAtom = atom(
  (get) => get(reasonsAtom),
  async (_, set) => {
    try {
      set(reasonLoadingAtom, true);

      const { error, data } = await gqlClient.query<GetReasonsQuery, GetReasonsQueryVariables>({
        query: GetReasonsDocument,
      });

      if (!error && data) {
        set(reasonsAtom, data.reasons ?? []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      set(reasonLoadingAtom, false);
    }
  }
);
