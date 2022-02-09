import axios from 'axios';

const bodylessRequest = (axiosClient, method, url, params) => {
  const options = {
    method,
    url,
  };
  if (params) {
    options.params = params;
  }
  return axiosClient(options);
};

const bodyRequest = (axiosClient, method, url, data, params) => {
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
  return axiosClient(options);
};

const createEndpoint = (baseUrl, axiosClient) => {
  const parametrize = (param) => {
    return createClient(`${baseUrl}/${param}`, axiosClient);
  };
  Object.assign(parametrize, {
    get(queryParams) {
      return bodylessRequest(axiosClient, 'GET', baseUrl, queryParams);
    },
    options(queryParams) {
      return bodylessRequest(axiosClient, 'GET', baseUrl, queryParams);
    },
    delete(queryParams) {
      return bodylessRequest(axiosClient, 'DELETE', baseUrl, queryParams);
    },
    post(data, queryParams) {
      return bodyRequest(axiosClient, 'POST', baseUrl, data, queryParams);
    },
    put(data, queryParams) {
      return bodyRequest(axiosClient, 'PUT', baseUrl, data, queryParams);
    },
    patch(data, queryParams) {
      return bodyRequest(axiosClient, 'PATCH', baseUrl, data, queryParams);
    },
  });
  return parametrize;
};

const createClient = (baseUrl, axiosClient) => {
  if (!axiosClient) {
    axiosClient = axios.create({
      baseURL: baseUrl,
    });
    baseUrl = null;
  }
  const endpointUrl = baseUrl ? baseUrl : '/';
  const endpoint = createEndpoint(endpointUrl, axiosClient);
  return new Proxy(endpoint, {
    get(target, key) {
      if (target[key]) {
        return target[key];
      }
      const subUrl = baseUrl ? `${baseUrl}/${key}` : `/${key}`;
      return createClient(subUrl, axiosClient);
    },
  });
};

export {
  createClient,
};

