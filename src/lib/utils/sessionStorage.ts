export const getSessionStorage = (key: string): string | object | null => {
  const value = sessionStorage.getItem(key);
  if (value === null) return value;
  return JSON.parse(value);
};
export const setSessionStorage = (key: string, value: string | object) => {
  if (typeof value === "object") value = JSON.stringify(value);
  sessionStorage.setItem(key, value);
};
