import { createPromiseTrigger } from './promise';

export const bodylessRequest = (axiosClient, method, url, params) => {
  const options = {
    method,
    url,
  };
  if (params) {
    options.params = params;
  }
  return createPromiseTrigger(() => axiosClient(options));
};

export const bodyRequest = (axiosClient, method, url, data, params) => {
  const options = {
    method,
    url,
  };
  if (data) {
    options.data = data;
  }
  if (params) {
    options.params = params;
  }
  return createPromiseTrigger(() => axiosClient(options));
};
