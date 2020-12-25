import { createReducer } from '../utils/reducer';

const defaultState = {
    apiError: null,
    flashMessage: null,
};

export default createReducer(defaultState, {
    'Reducer - error: set API error': (state, { payload }) => {
        let messages = [];
        let code = null;
        try {
            if (payload.response && payload.response.data) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx

                if (payload.response.status === 401) {
                    /**
                     * Token has been expired, or unauthenticated.
                     * Need login/relogin to continue
                     */
                    return {
                        ...state,
                        apiError: {
                            code: 401,
                            messages: 'Section has been expired or invalid. Please login/relogin!',
                        },
                    };
                }

                if (payload.response.data.errors) {
                    const errs = Array.isArray(payload.response.data.errors)
                        ? payload.response.data.errors
                        : [payload.response.data.errors];
                    messages = errs.reduce((a, e) => {
                        return a.concat(e.message);
                    }, []);
                    code = payload.response.status;
                } else if (payload.response.data.message) {
                    messages = [payload.response.data.message];
                    code = payload.response.status;
                } else {
                    messages = ['Unexpected error'];
                    code = payload.response.status;
                }
            } else if (payload.request && payload.request.message) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                code = payload.response.status;
                messages = payload.request.message;
            } else {
                // Something happened in setting up the request that triggered an Error
                code = payload.response.status;
                messages = 'Unexpected error occurred!';
            }
        } catch (e) {
            code = payload.response.status;
            messages = 'Unknown error occurred!';
        }

        return { ...state, apiError: { code, messages } };
    },

    'Reducer - app: set flash message': (state, { payload: { severity, message, timeout = 3000 } }) => ({
        ...state,
        flashMessage: {
            severity,
            message,
            timeout,
        },
    }),

    'Reducer - app: clear flash message': (state) => ({
        ...state,
        flashMessage: null,
    }),

    CLEAR_API_ERROR: (state) => ({ ...state, apiError: null }),
});
