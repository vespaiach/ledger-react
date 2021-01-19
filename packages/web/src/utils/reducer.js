export function createReducer(initialState, handlers) {
    return function reducer(state = initialState, action) {
        if (handlers.hasOwnProperty(action.type)) {
            return handlers[action.type](state, action);
        } else {
            return state;
        }
    };
}

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
            if (apiResponse.state === 422) {
                return {
                    ...state,
                    error: {
                        title: apiResponse.statusText,
                        messages: apiResponse.data
                            ? Object.values(apiResponse.data).reduce((acc, ers) => {
                                  acc = acc.concat(ers);
                                  return acc;
                              }, [])
                            : ['Unknown error'],
                    },
                };
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
