import ajax from '../ajax';
import transformRequest from '../ajax/transformFetchRequest';
import transformResponse from '../ajax/transformFetchResponse';

export default ajax({
    baseUrl: process.env.REACT_APP_BASE_API_URL,
    transformRequest,
    transformResponse,
    mode: 'cors',
    cache: 'no-store',
    credentials: process.env.NODE_ENV === 'development' ? 'include' : 'same-origin',
    headers: {
        'Content-Type': 'application/json',
    },
});
