import {
  getLocalStorageItem,
  removeLocalStorageItem,
  setLocalStorageItem,
} from "@/utils/local-storage-utils";

describe("local storage utils", () => {
  const STORAGE_KEY = "test-key";

  afterEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it("sets and get the string item", () => {
    setLocalStorageItem(STORAGE_KEY, "hello balikis");

    const item = getLocalStorageItem<string>(STORAGE_KEY);

    expect(item).toBe("hello balikis");
  });

  it("sets and get the object item", () => {
    const value = { id: 1, content: "winner" };

    setLocalStorageItem(STORAGE_KEY, value);

    const item = getLocalStorageItem<typeof value>(STORAGE_KEY);

    expect(item).toEqual(value);
  });

  it("returns null for no existent item", () => {
    const item = getLocalStorageItem(STORAGE_KEY);

    expect(item).toBeNull();
  });

  it("removes an item", () => {
    setLocalStorageItem(STORAGE_KEY, "hello balikis");

    const item = getLocalStorageItem<string>(STORAGE_KEY);

    expect(item).toBe("hello balikis");

    removeLocalStorageItem(STORAGE_KEY);

    const item2 = getLocalStorageItem<string>(STORAGE_KEY);

    expect(item2).toBeNull();
  });
});
