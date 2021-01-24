import { useCallback } from 'react';
import useFetch from './useFetch';

export default function useApi(baseApiUrl) {
    const remote = useFetch();

    return useCallback(async ({ ep, method, params, data, queries }) => {
        await remote[method]({ep}).

    }, [remote, baseApiUrl]);
}
