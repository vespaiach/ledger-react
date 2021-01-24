const transformFetchResponse = async (response) => {
    if (!response || !(response instanceof Response)) {
        throw new Error('It was not a response of fetch api');
    }

    const contentType = response.headers.get('Content-Type');
    const result = {
        ok: response.ok,
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
    };

    if (contentType) {
        if (contentType.indexOf('application/json') > -1) {
            result.data = await response.json();
        } else if (contentType.indexOf('text/') > -1) {
            result.data = await response.text();
        } else {
            result.data = response.body;
        }
    }

    return result;
};

export default transformFetchResponse;
