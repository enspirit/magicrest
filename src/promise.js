export const createPromiseTrigger = (fn) => {
  return {
    get then() {
      return fn();
    },
    get catch() {
      return fn();
    },
  };
};
