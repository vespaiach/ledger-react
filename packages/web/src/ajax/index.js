/**
 * Ajax Interface.
 * This module provides unified interfaces for asynchronous calls to server.
 *
 * Usage:
 *  - Call setup function and provide initial configurations
 *  - Use return methods from setup function to make ajax calls
 */

// Initial configurations.
let commonHeaders = {};
let commonConfigs = {};
let apiOrigin = '';
let defaultAdapter = window.fetch;
let defaultTransformResponse = (v) => v;
let defaultTransformRequest = (v) => v;

const ajax = (method) => async ({
    ep,
    params,
    body,
    headers,
    adapter,
    transformResponse,
    transformRequest,
    ...others
}) => {
    let url;
    if (typeof ep === 'function') {
        url = ep(params, apiOrigin);
    } else {
        url = `${apiOrigin}${ep}`;
        if (params) {
            url += Object.entries(params).reduce(
                (acc, [k, v], i) => `${i === 0 ? '?' : ''}${acc}${i > 0 ? '&' : ''}${k}=${v}`,
                ''
            );
        }
    }

    let options = Object.assign({ method }, commonConfigs, others);
    options.headers = Object.assign({}, commonHeaders, headers);
    if (method !== 'GET' && method !== 'HEAD' && body) {
        options.body = body;
    }
    options = transformRequest ? transformRequest(options) : defaultTransformRequest(options);

    try {
        const result = await (adapter ? adapter(url, options) : defaultAdapter(url, options));
        return transformResponse ? transformResponse(result) : defaultTransformResponse(result);
    } catch (err) {
        return transformResponse ? transformResponse(err) : defaultTransformResponse(err);
    }
};

const get = ajax('GET');
const post = ajax('POST');
const put = ajax('PUT');
const del = ajax('DELETE');
const head = ajax('HEAD');
const patch = ajax('PATCH');
const setup = ({ baseUrl, headers, transformResponse, transformRequest, configs, adapter }) => {
    apiOrigin = baseUrl;
    commonHeaders = headers;
    commonConfigs = configs;
    defaultAdapter = adapter || window.fetch;
    defaultTransformResponse = transformResponse || ((v) => v);
    defaultTransformRequest = transformRequest || ((v) => v);
    return {
        get,
        post,
        put,
        del,
        head,
        patch,
    };
};

export default setup;
