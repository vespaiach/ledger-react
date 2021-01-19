import { createReducer, handleApiError } from '../../utils/reducer';

const defaultState = {
    error: null,
};

export default createReducer(
    defaultState,
    handleApiError('Reducer - signup: set errors', 'Reducer - signup: clear errors')
);
