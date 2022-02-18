import { atom } from 'jotai';

import {
  CreateReasonDocument,
  CreateReasonMutation,
  CreateReasonMutationVariables,
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

export const createReasonsAtom = atom<null, CreateReasonMutationVariables>(
  () => null,
  async (_, set, variables) => {
    set(reasonCreatingAtom, true);

    const { errors, data } = await gqlClient.mutate<CreateReasonMutation, CreateReasonMutationVariables>({
      mutation: CreateReasonDocument,
      variables,
    });

    if (errors) {
      console.error(errors);
    }

    if (data?.reason) {
      set(reasonsAtom, (prev) => [...prev, data.reason as Reason]);
    }

    set(reasonCreatingAtom, false);
  }
);
