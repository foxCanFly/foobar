import axios, { AxiosRequestConfig } from 'axios';
import { Environment } from '../environment';

export class RequestHandler {
  static async request<T>(options: AxiosRequestConfig) {
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
  }

  static async post<T = any, D = any>(options: AxiosRequestConfig<D>) {
    return RequestHandler.request<T>({ ...options, method: 'POST' });
  }

  static async get<T = any>(options: AxiosRequestConfig) {
    return RequestHandler.request<T>({ ...options, method: 'GET' });
  }
}
