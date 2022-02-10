import PromiseTriggered from './promise-triggered';

export default class Request extends PromiseTriggered {

  #options
  #axiosClient
  #promise
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
    if (!this.#promise) {
      this.#promise = this.axios(this.options);
    }
    return this.#promise;
  }

  with(settings) {
    Object.assign(this.#options, settings);
    return this;
  }

  withHeaders(headers = {}) {
    if (!this.#options.headers) {
      this.#options.headers = {};
    }
    Object.assign(this.#options.headers, {
      ...headers,
    });
    return this;
  }

  toJSON() {
    return { ...this.options };
  }

}
