import axios from 'axios';
import fetchAdapter from 'axios-fetch-adapter';

const axiosInstance = axios.create({
    baseUrl: process.env.REACT_APP_BASE_API_URL,
    mode: 'cors',
    cache: 'no-store',
    credentials: process.env.NODE_ENV === 'development' ? 'include' : 'same-origin',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
    adapter: fetchAdapter,
    settle: (resolve, _, response) => {
        resolve(response);
    },
});

export default axiosInstance;
