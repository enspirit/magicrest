import PromiseTriggered from './promise-triggered';

export default class Request extends PromiseTriggered {

  #options
  #axiosClient
  constructor(options, axiosClient) {
    super();
    this.#options = { ...options };
    this.#axiosClient = axiosClient;
  }

  get axios() {
    return this.#axiosClient;
  }

  get options() {
    return this.#options;
  }

  get promise() {
    return this.axios(this.options);
  }

  with(settings) {
    Object.assign(this.#options, settings);
    return this;
  }

  withHeaders(headers = {}) {
    this.#options.headers ||= {};
    Object.assign(this.#options.headers, {
      ...headers,
    });
    return this;
  }

  toJSON() {
    return { ...this.options };
  }

}
