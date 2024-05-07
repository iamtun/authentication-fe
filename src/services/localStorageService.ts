class LocalStorageService {
  constructor() {}

  getValue(key: string) {
    return localStorage.getItem(key);
  }

  setValue(key: string, value: string) {
    return localStorage.setItem(key, value);
  }

  deleteValue(key: string) {
    return localStorage.removeItem(key);
  }
  clear() {
    localStorage.clear();
  }
}

const localStorageService = new LocalStorageService();
export default localStorageService;
