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
    'Reducer - inTrans: set id of income': (state, { payload }) => ({
        ...state,
        id: payload,
    }),

    'Reducer - inTrans: set amount of income': (state, { payload }) => ({
        ...state,
        amount: payload,
    }),

    'Reducer - inTrans: set date of income': (state, { payload }) => ({
        ...state,
        date: payload,
    }),

    'Reducer - inTrans: set description of income': (state, { payload }) => ({
        ...state,
        description: payload,
    }),

    'Reducer - inTrans: set category of income': (state, { payload }) => ({
        ...state,
        category: payload,
    }),

    'Reducer - inTrans: set saving income on': (state) => ({ ...state, saving: true }),

    'Reducer - inTrans: set saving income off': (state) => ({ ...state, saving: false }),

    'Reducer - inTrans: clear all income data': (state) => ({
        ...state,
        id: defaultState.id,
        amount: defaultState.amount,
        date: defaultState.date,
        description: defaultState.description,
        category: defaultState.category,
    }),

    'Reducer - inTrans: open form dialog': (state) => ({ ...state, openDialog: true }),

    'Reducer - inTrans: close form dialog': (state) => ({ ...state, openDialog: false }),

    'Reducer - inTrans: close setting form': (state) => ({ ...state, openSettingForm: false }),

    'Reducer - inTrans: open setting form': (state) => ({ ...state, openSettingForm: true }),
});
