import { put } from 'redux-saga/effects';
import { formatISO } from 'date-fns';

export function* safeCall(effect) {
    try {
        return yield effect;
    } catch (err) {
        yield put({ type: 'Reducer - app: set API error', payload: err });
        return {
            ok: false,
            data: err,
        };
    }
}

export function buildParams(search, sort, page, perPage = 100) {
    const params = { by: sort };
    if (page) {
        params.pg = page;
        params.per_page = perPage;
    }
    if (search) {
        if (search.byDateFrom) {
            params.from = formatISO(search.byDateFrom);
        }
        if (search.byDateTo) {
            params.to = formatISO(search.byDateTo);
        }
        if (search.byCategory) {
            params.cate = search.byCategory;
        }
    }

    return params;
}
