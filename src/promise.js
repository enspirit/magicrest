export const createPromiseTrigger = (func) => {
  let _promise = null;
  const getPromise = () => {
    _promise ||= func();
    return _promise;
  };
  return {
    get then() {
      return getPromise().then.bind(getPromise());
    },
    get catch() {
      return getPromise().catch.bind(getPromise());
    },
    get finally() {
      return getPromise().finally.bind(getPromise());
    },
  };
};
