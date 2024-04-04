import { gunzipSync } from "zlib";

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

export const withImageSize = (
  url: string,
  width: number | string,
  height: number | string = "auto",
) => {
  return `${url}?width=${width}&height=${height}`;
};

export const decompress = (body: Uint8Array) => {
  const decompressed = gunzipSync(body);
  const decoder = new TextDecoder("utf-8");
  const decoded = decoder.decode(decompressed);
  return decoded;
};

export const format = (date: Date) => {
  const formatter = Intl.DateTimeFormat("ko-KR", { dateStyle: "medium" });
  return formatter.format(date);
};
