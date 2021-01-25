import { put } from 'redux-saga/effects';
import { formatISO } from 'date-fns';

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

export function buildParams(search, sort, page, perPage = 100) {
    const params = {};
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

    if (sort) {
        let byDate = sort.byDate ? `${sort.byDate}date` : '';
        let byAmount = sort.byAmount ? `${sort.byAmount}amount` : '';
        params.by = `${byDate}${byDate && byAmount ? ',' : ''}${byAmount}`;
    }

    return params;
}
