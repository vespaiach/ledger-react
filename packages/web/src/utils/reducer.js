export function createReducer(initialState, handlers) {
    return function reducer(state = initialState, action) {
        if (handlers.hasOwnProperty(action.type)) {
            return handlers[action.type](state, action);
        } else {
            return state;
        }
    };
}

/**
 * Create common actions to set on and off loading field
 */
export function createLoadingReducer(setLoadinOnAction, setLoadingOffAction) {
    return {
        [setLoadinOnAction]: (state) => ({ ...state, loading: true }),
        [setLoadingOffAction]: (state) => ({ ...state, loading: false }),
    };
}

/**
 * Create common actions to set and clear error from API
 */
export function handleApiError(setErrorAction, clearErrorAction) {
    return {
        [clearErrorAction]: (state) => ({ ...state, error: null }),

        [setErrorAction]: (state, { payload: apiResponse }) => {
            if (apiResponse.status === 422) {
                const tmp = {
                    ...state,
                    error: {
                        title: apiResponse.statusText,
                    },
                };

                if (apiResponse.data) {
                    if (apiResponse.data.errors && Array.isArray(apiResponse.data.errors)) {
                        tmp.error.messages = apiResponse.data.errors.map(
                            (e) => `"${e.field}" ${e.message}`
                        );
                    } else {
                        tmp.error.messages = Object.values(apiResponse.data).reduce((acc, ers) => {
                            acc = acc.concat(ers);
                            return acc;
                        }, []);
                    }
                    return tmp;
                }

                tmp.error.messages = ['Unknown error'];

                return tmp;
            }
            return {
                ...state,
                error: {
                    title: 'Error',
                    messages: ['Unknown error'],
                },
            };
        },
    };
}
