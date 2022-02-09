export default class PromiseTriggered {

  get promise() {
    throw new Error(`Not Implemented: ${this.constructor.name}/get promise()`);
  }

  get then() {
    return this.promise.then.bind(this.promise);
  }

  get catch() {
    return this.promise.catch.bind(this.promise);
  }

  get finally() {
    return this.promise.finally.bind(this.promise);
  }

}
