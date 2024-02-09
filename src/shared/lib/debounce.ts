export const debounce = <F extends (...args: any) => unknown>(
  func: F,
  delay: number
): ((...args: any) => unknown) => {
  let timeout: ReturnType<typeof setTimeout>;

  const debounced = function (this: any, ...args: any) {
    let result: unknown;

    clearTimeout(timeout);

    timeout = setTimeout(() => {
      result = func.apply(this, args);
    }, delay);

    return result!;
  };

  return debounced;
};
