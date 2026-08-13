type CacheItem<T> = {
  data: T;
};

export function getCache<T>(key: string): T | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const cached = localStorage.getItem(key);

    if (!cached) {
      return null;
    }

    const item: CacheItem<T> = JSON.parse(cached);

    return item.data;
  } catch (error) {
    console.error(`Failed to get cache "${key}":`, error);
    localStorage.removeItem(key);

    return null;
  }
}

export function setCache<T>(key: string, data: T): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    const item: CacheItem<T> = {
      data,
    };

    localStorage.setItem(key, JSON.stringify(item));
  } catch (error) {
    console.error(`Failed to set cache "${key}":`, error);
  }
}

export function removeCache(key: string): void {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.removeItem(key);
}

export function clearCache(): void {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.clear();
}
