import { createReducer } from '../utils/reducer';

const defaultState = {
    loading: false,
    flashMessage: '',
    flashMessageSeverity: '',
    confirm: null,
    me: null,
};

export default createReducer(defaultState, {
    'Reducer - app: set app loading on': (state) => ({ ...state, loading: true }),
    'Reducer - app: set app loading off': (state) => ({ ...state, loading: false }),

    'Reducer - app: set flash message': (state, { payload: { message, severity = 'info' } }) => ({
        ...state,
        flashMessage: message,
        flashMessageSeverity: severity,
    }),
    'Reducer - app: clear flash message': (state) => ({
        ...state,
        flashMessage: '',
        flashMessageSeverity: '',
    }),

    'Reducer - app: set me': (state, { payload: me }) => ({ ...state, me }),
    'Reducer - app: clear login info': (state) => ({ ...state, me: null }),

    'Reducer - app: confirm': (state, { payload: confirm }) => ({ ...state, confirm }),
    'Reducer - app: clear confirm': (state) => ({ ...state, confirm: null }),

    'Reducer - app: clear API error': (state) => ({ ...state, apiError: null }),
    'Reducer - app: set API error': (state, { payload: apiResponse }) => {
        if (apiResponse.status === 422) {
            const tmp = {
                ...state,
                apiError: {
                    title: apiResponse.statusText,
                },
            };

            if (apiResponse.data) {
                if (apiResponse.data.errors && Array.isArray(apiResponse.data.errors)) {
                    tmp.apiError.messages = apiResponse.data.errors.map(
                        (e) => `"${e.field}" ${e.message}`
                    );
                } else {
                    tmp.apiError.messages = Object.values(apiResponse.data).reduce((acc, ers) => {
                        acc = acc.concat(ers);
                        return acc;
                    }, []);
                }
                return tmp;
            }

            tmp.apiError.messages = ['Unknown error'];

            return tmp;
        }
        return {
            ...state,
            apiError: {
                title: 'Error',
                messages: ['Unknown error'],
            },
        };
    },
});
