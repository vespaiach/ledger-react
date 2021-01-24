import { createReducer, handleApiError } from '../../utils/reducer';

const defaultState = {
    error: null,
};

export default createReducer(
    defaultState,
    handleApiError('Reducer - signin: set errors', 'Reducer - signin: clear errors')
);
