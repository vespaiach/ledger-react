import { createReducer } from '../../../utils/reducer';

const defaultState = {
    list: [],
    loading: false,
};

export default createReducer(defaultState, {
    'Reducer - exCates: set loading on': (state) => ({ ...state, loading: true }),

    'Reducer - exCates: set loading off': (state) => ({ ...state, loading: false }),

    'Reducer - exCates: save list of categories': (state, { payload }) => ({ ...state, list: payload }),
});
