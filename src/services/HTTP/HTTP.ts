import axios, { AxiosRequestConfig } from 'axios';
import { Environment } from '../environment';

const request = async <T>(options: AxiosRequestConfig) => {
  const config = await Environment.config();

  const optionsToUse = {
    ...options,
    baseURL: config.API_URL,
    url: options.url,
    headers: {
      ...options.headers
    },
    timeout: 3 * 1000
  };

  const response = await axios.request<T>(optionsToUse);

  return response.data;
};

const post = async <T = unknown, D = unknown>(options: AxiosRequestConfig<D>) => {
  return request<T>({ ...options, method: 'POST' });
};

const get = async <T = unknown>(options: AxiosRequestConfig) => {
  return request<T>({ ...options, method: 'GET' });
};

export const HTTP = {
  post,
  get,
  request
};
