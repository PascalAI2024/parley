interface CacheItem<T> {
  data: T;
  timestamp: number;
}

const TWO_HOURS = 2 * 60 * 60 * 1000; // 2 hours in milliseconds

export class Cache {
  static set<T>(key: string, data: T): void {
    const cacheItem: CacheItem<T> = {
      data,
      timestamp: Date.now(),
    };
    localStorage.setItem(key, JSON.stringify(cacheItem));
  }

  static get<T>(key: string): T | null {
    const item = localStorage.getItem(key);
    if (!item) return null;

    const cacheItem: CacheItem<T> = JSON.parse(item);
    const age = Date.now() - cacheItem.timestamp;

    if (age > TWO_HOURS) {
      localStorage.removeItem(key);
      return null;
    }

    return cacheItem.data;
  }

  static clear(key: string): void {
    localStorage.removeItem(key);
  }
}