export const getRoot = () => {
  const selector = ":root";
  return document.querySelector(selector) as HTMLHtmlElement;
};

export const getSidebar = () => {
  const selector = "aside#sidebar";
  return document.querySelector(selector) as HTMLDivElement;
};

export const getPostIndexUl = () => {
  return getSidebar().querySelector("ul#post-index-list") as HTMLUListElement;
};

export const getPostImagesUl = () => {
  return getSidebar().querySelector("ul#post-images-list") as HTMLUListElement;
};

export const getPostArticle = () => {
  const key = "article#post-article";
  return document.querySelector(key) as HTMLDivElement;
};

export const getAllHeadingsInPost = () => {
  const headings = Array.from(getPostArticle().querySelectorAll(".heading"));
  return headings as HTMLHeadingElement[];
};

export const getImagesInPost = () => {
  const imgs = Array.from(getPostArticle().querySelectorAll("img"));
  return imgs as HTMLImageElement[];
};
