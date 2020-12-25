import { createReducer } from '../../../utils/reducer';

const defaultState = {
    list: [],
    loading: false,
};

export default createReducer(defaultState, {
    'Reducer - inCates: set loading on': (state) => ({ ...state, loading: true }),

    'Reducer - inCates: set loading off': (state) => ({ ...state, loading: false }),

    'Reducer - inCates: save list of categories': (state, { payload }) => ({ ...state, list: payload }),
});
