import { useMemo } from 'react';

const defaultHeaders = {
    'Content-Type': 'application/json',
    mode: 'cors',
};

export default function useFetch() {
    return useMemo(() => {
        const getResponse = async (res) => {
            try {
                const contentType = res.headers.get('Content-Type');
                if (contentType === 'application/json') {
                    return [res.ok, await res.json()];
                } else if (contentType.indexOf('text/') > -1) {
                    return [res.ok, await res.text()];
                } else {
                    return [res.ok, await res.blob()];
                }
            } catch (e) {
                return [false, e];
            }
        };

        const get = async ({ ep, headers = {} }) => {
            try {
                const req = new Request(ep, {
                    method: 'GET',
                    headers: new Headers({
                        ...defaultHeaders,
                        ...headers,
                    }),
                });

                return await getResponse(await fetch(req));
            } catch (e) {
                return [false, e];
            }
        };

        const post = async ({ ep, data, headers = {} }) => {
            try {
                const req = new Request(ep, {
                    method: 'POST',
                    headers: new Headers({
                        ...defaultHeaders,
                        ...headers,
                    }),
                    body: data,
                });

                return await getResponse(await fetch(req));
            } catch (e) {
                return [false, e];
            }
        };

        return {
            get,
            post,
        };
    }, []);
}
