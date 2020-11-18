const defaultState = {
    apiError: null,
};

export default function reducer(state = defaultState, { type, payload }) {
    switch (type) {
        case 'Store: api request fail':
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
                                messages:
                                    'Section has been expired or invalid. Please login/relogin!',
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

        case 'CLEAR_API_ERROR':
            return { ...state, apiError: null };

        default:
            return state;
    }
}
