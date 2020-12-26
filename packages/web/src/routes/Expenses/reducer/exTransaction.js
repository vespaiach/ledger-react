import { createReducer } from '../../../utils/reducer';

const defaultState = {
    id: null,
    amount: null,
    date: null,
    description: '',
    category: null,
    saving: false,
    openDialog: false,
    openSettingForm: false,
};

export default createReducer(defaultState, {
    'Reducer - exTrans: set id of expense': (state, { payload }) => ({
        ...state,
        id: payload,
    }),

    'Reducer - exTrans: set amount of expense': (state, { payload }) => ({
        ...state,
        amount: payload,
    }),

    'Reducer - exTrans: set date of expense': (state, { payload }) => ({
        ...state,
        date: payload,
    }),

    'Reducer - exTrans: set description of expense': (state, { payload }) => ({
        ...state,
        description: payload,
    }),

    'Reducer - exTrans: set category of expense': (state, { payload }) => ({
        ...state,
        category: payload,
    }),

    'Reducer - exTrans: set saving expense on': (state) => ({ ...state, saving: true }),

    'Reducer - exTrans: set saving expense off': (state) => ({ ...state, saving: false }),

    'Reducer - exTrans: clear all expense data': (state) => ({
        ...state,
        id: defaultState.id,
        amount: defaultState.amount,
        date: defaultState.date,
        description: defaultState.description,
        category: defaultState.category,
    }),

    'Reducer - exTrans: open form dialog': (state) => ({ ...state, openDialog: true }),

    'Reducer - exTrans: close form dialog': (state) => ({ ...state, openDialog: false }),

    'Reducer - exTrans: close setting form': (state) => ({ ...state, openSettingForm: false }),

    'Reducer - exTrans: open setting form': (state) => ({ ...state, openSettingForm: true }),
});
