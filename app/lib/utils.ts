export const slugToStr = (slug: string) => slug.split("-").join(" ");
export const strToSlug = (str: string) => str.split(" ").join("-");

export const throttling = <T extends (...args: any[]) => void>(
  cb: T extends infer R ? R : (...args: any[]) => void,
  throttle = 500,
) => {
  let timer = 0;
  return (...args: Parameters<T>) => {
    const current = Date.now();
    if (current >= timer + throttle) {
      cb(...args);
      timer = current;
    }
  };
};
