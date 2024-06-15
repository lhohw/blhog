export const getRoot = () => {
  const selector = ":root";
  return document.querySelector(selector) as HTMLHtmlElement;
};

export const getSidebar = () => {
  const selector = "aside#sidebar";
  return document.querySelector(selector) as HTMLDivElement;
};

export const getIndexHeadingsUl = () => {
  return getSidebar().querySelector("ul") as HTMLUListElement;
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
