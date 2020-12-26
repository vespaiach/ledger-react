import { createReducer } from '../../../utils/reducer';

const defaultState = {
    id: null,
    name: '',
    email: '',
    loading: false,
};

export default createReducer(defaultState, {
    'Reducer - me: set id': (state, { payload }) => ({ ...state, id: payload }),

    'Reducer - me: set email': (state, { payload }) => ({ ...state, email: payload }),

    'Reducer - me: set name': (state, { payload }) => ({ ...state, name: payload }),

    'Reducer - me: set loading on': (state) => ({ ...state, loading: true }),

    'Reducer - me: set loading off': (state) => ({ ...state, loading: false }),
});
