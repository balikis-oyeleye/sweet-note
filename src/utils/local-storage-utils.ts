type StoreItem = string | number | boolean | object | null;

export const setLocalStorage = (key: string, value: StoreItem) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getLocalStorage = <T extends StoreItem>(key: string): T | null => {
  const item = localStorage.getItem(key);

  if (item) {
    try {
      return JSON.parse(item) as T;
    } catch (error) {
      console.error(`Error parsing localStorage item "${key}":`, error);
      return null;
    }
  }
  return null;
};

export const removeLocalStorage = (key: string): void => {
  localStorage.removeItem(key);
};
