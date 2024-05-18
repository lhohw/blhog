export const throttling = <T extends (...args: any[]) => void>(
  cb: T extends infer R ? R : (...args: any[]) => void,
  throttle = 500,
) => {
  let timer = 0;
  return (...args: Parameters<T>) => {
    const current = performance.now();
    if (current >= timer + throttle) {
      cb(...args);
      timer = current;
    }
  };
};

export const debouncing = <T extends (...args: any[]) => void>(
  cb: T extends infer R ? R : (...args: any[]) => void,
  throttle = 500,
) => {
  let iter = 0;
  return (...args: Parameters<T>) => {
    const current = ++iter;
    setTimeout(() => {
      if (current === iter) {
        cb(...args);
        console.log(iter, "cb!");
      }
    }, throttle);
  };
};
