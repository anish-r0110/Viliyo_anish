class AppStorage {
    getItem<T>(key: string): T | null {
      const item = localStorage.getItem(key);
      if (item) {
        try {
          return JSON.parse(item);
        } catch (error) {
          console.error(`Error parsing localStorage item with key: ${key}`);
        }
      }
      return null;
    }
  
    setItem<T>(key: string, value: T): void {
      try {
        const serializedValue = JSON.stringify(value);
        localStorage.setItem(key, serializedValue);
      } catch (error) {
        console.error(`Error setting localStorage item with key: ${key}`);
      }
    }
  
    removeItem(key: string): void {
      localStorage.removeItem(key);
    }
  
    clear(): void {
      localStorage.clear();
    }
  }
  
  export default AppStorage;
  