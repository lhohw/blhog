export const throttling = <T extends (...args: any[]) => any>(
  cb: T,
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

export const debouncing = <T extends (...args: any[]) => any>(
  cb: T,
  throttle = 500,
  limit = 1 << 30,
) => {
  let prev = 0;
  let nextLimit = limit;
  return (...args: Parameters<T>) => {
    prev = performance.now();
    setTimeout(() => {
      const now = performance.now();
      if (now - prev >= throttle || now >= nextLimit) {
        nextLimit = now + limit;
        cb(...args);
        prev = now;
      }
    }, throttle);
  };
};
