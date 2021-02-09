import { createReducer } from '../../utils/reducer';
import { getMonthName } from '../../utils/format';

const defaultState = {
    status: '',
    months: null,
    incomes: {},
    expenses: {},
};

export default createReducer(defaultState, {
    'Reducer - monthly: save month statistics': (state, { payload: { data, year, month } }) => {
        return {
            ...state,
            incomes: {
                ...state.incomes,
                [`${year}-${month}`]: data.incomes.map((inc) => ({
                    name: inc.category,
                    total: parseFloat(inc.total),
                })),
            },
            expenses: {
                ...state.expenses,
                [`${year}-${month}`]: data.expenses.map((exs) => ({
                    name: exs.category,
                    total: parseFloat(exs.total),
                })),
            },
        };
    },

    /**
     * Build a month array:
     * [
     *      {month:1, year: 2020, name: 'January'},
     *      {month:2, year: 2020, name: 'February'},
     *      ...
     * ]
     */
    'Reducer - monthly: save the latest month': (state, { payload }) => {
        const min = new Date(payload);
        const max = new Date();
        const months = [];

        for (let i = min; i <= max; i.setMonth(i.getMonth() + 1)) {
            const year = i.getFullYear();
            const month = i.getMonth() + 1;

            months.push({
                month,
                year,
                name: getMonthName(month),
            });
        }

        return {
            ...state,
            months: months.reverse(),
        };
    },

    'Reducer - monthly: set status loading': (state) => ({ ...state, status: 'loading' }),
    'Reducer - monthly: set status loaded': (state) => ({ ...state, status: 'loaded' }),
});
