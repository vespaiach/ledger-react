import { Reducer } from 'redux';

/**
 * This helper function will help to eliminate switch cases in reducer functions
 */
export function createReducer<T>(
  initialState: T,
  handlers: { [key: string]: (state: T, action: any) => T }
): Reducer<T, any> {
  return (state = initialState, action) => {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action);
    } else {
      return state;
    }
  };
}
