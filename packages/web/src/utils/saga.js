import { put } from 'redux-saga/effects';

export function* safeCall(effect) {
    try {
        return yield effect;
    } catch (err) {
        yield put({ type: 'Reducer - error: set API error', payload: err });
        return {
            ok: false,
            data: err,
        };
    }
}
