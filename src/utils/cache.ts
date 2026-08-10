type CacheItem<T> = {
  data: T;
  expiry: number;
};

const cache = new Map<string, CacheItem<unknown>>();

export function getCache<T>(key: string): T | null {
  const item = cache.get(key);

  if (!item) return null;

  if (Date.now() > item.expiry) {
    cache.delete(key);
    return null;
  }

  return item.data as T;
}

export function setCache<T>(key: string, data: T, ttl = 5 * 60 * 1000) {
  cache.set(key, {
    data,
    expiry: Date.now() + ttl,
  });
}

export function removeCache(key: string) {
  cache.delete(key);
}

export function clearCache() {
  cache.clear();
}
