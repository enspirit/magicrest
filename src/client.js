import axios from 'axios';

const createEndpoint = (baseUrl, axiosClient) => {
  const parametrize = (param) => {
    return createClient(`${baseUrl}/${param}`, axiosClient);
  };
  Object.assign(parametrize, {
    get() {
      return axiosClient({
        method: 'GET',
        url: baseUrl,
      });
    },
    post(data) {
      return axiosClient({
        method: 'POST',
        url: baseUrl,
        data,
      });
    },
  });
  return parametrize;
};

const createClient = (baseUrl, axiosClient) => {
  if (!axiosClient) {
    axiosClient = axios.create({
      baseURL: baseUrl,
    });
    baseUrl = '';
  }
  const endpoint = createEndpoint(baseUrl, axiosClient);
  return new Proxy(endpoint, {
    get(target, key) {
      if (target[key]) {
        return target[key];
      }
      return createClient(`${baseUrl}/${key}`, axiosClient);
    },
  });
};

export {
  createClient,
};

