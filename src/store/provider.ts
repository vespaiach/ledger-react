import provider from './remoteDbProvider';

const selectedProvider = window.localStorage.getItem('offline_provider') ? provider : provider;

export default selectedProvider;
