type StoreItem = string | number | boolean | object;

export const setLocalStorageItem = (key: string, value: StoreItem) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getLocalStorageItem = <T extends StoreItem>(
  key: string
): T | null => {
  if (typeof window === "undefined") {
    return null;
  }

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

export const removeLocalStorageItem = (key: string): void => {
  localStorage.removeItem(key);
};
