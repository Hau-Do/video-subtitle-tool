import axios from 'axios';
const API_ROOT = process.env.REACT_APP_API_DOMAIN_MOCK;

const httpClient = axios.create({
    baseURL: API_ROOT
});

httpClient.interceptors.request.use(
    (config) => {
        return config;
    }, 
    (error) => {
        return Promise.reject(error);
    }
);

httpClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default httpClient;