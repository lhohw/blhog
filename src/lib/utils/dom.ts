type Scalars<T> = T | T[];
const cache: Record<string, Scalars<HTMLElement>> = {};

export const getRoot = () => {
  const key = ":root";
  if (cache[key]) return cache[key] as HTMLHtmlElement;
  return (cache[key] = document.querySelector(key) as HTMLHtmlElement);
};

export const getSidebar = () => {
  const key = "sidebar";
  const selector = "#sidebar";
  if (key in cache) return cache[key] as HTMLDivElement;
  return (cache[key] = document.querySelector(selector) as HTMLDivElement);
};

export const getIndexHeadingsUl = () => {
  const key = "sidebar-post-index-headings";
  if (key in cache) return cache[key] as HTMLUListElement;
  return (cache[key] = getSidebar().querySelector("ul") as HTMLUListElement);
};

export const getPostArticle = () => {
  const key = "article#post-article";
  if (key in cache) return cache[key] as HTMLDivElement;
  return (cache[key] = document.querySelector(key) as HTMLDivElement);
};

export const getAllHeadingsInPost = () => {
  const key = ".heading";
  if (key in cache) return cache[key] as HTMLHeadingElement[];
  const headings = Array.from(getPostArticle().querySelectorAll(key));
  return (cache[key] = headings as HTMLHeadingElement[]);
};

export const getImagesInPost = () => {
  const key = "imgs-in-post";
  if (key in cache) return cache[key] as HTMLImageElement[];
  const imgs = Array.from(getPostArticle().querySelectorAll("img"));
  return (cache[key] = imgs);
};
