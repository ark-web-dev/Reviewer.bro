export const setLocalStorage = (key: string, value: unknown) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`LocalStorage Error ${error}`);
    return null;
  }
};
