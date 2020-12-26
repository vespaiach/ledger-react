const defaultState = { me: null, logining: false };

export default function reducer(state = defaultState, action) {
    switch (action.type) {
        case 'FETCHING_LOGIN':
            return { ...state, logining: true };

        case 'FETCHED_LOGIN_FAIL':
            return { ...state, logining: false };

        case 'FETCHED_LOGIN_SUCCESS':
            return {
                ...state,
                logining: false,
                me: action.payload,
            };

        case 'FETCHED_ME_SUCCESS':
            return {
                ...state,
                me: action.payload,
            };

        case 'REQUEST_LOGOUT':
            return {
                ...state,
                me: null,
            };

        default:
            return state;
    }
}
