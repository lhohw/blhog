export const slugToStr = (slug: string, seperator = " ") =>
  slug.split("-").join(seperator);
export const strToSlug = (str: string, splitter = " ") =>
  str.split(splitter).join("-");

export const toPascalCase = (str: string, splitter = "-", seperator = "") =>
  str
    .split(splitter)
    .map((e) => (e ? e[0].toUpperCase() + e.substring(1) : ""))
    .join(seperator);
