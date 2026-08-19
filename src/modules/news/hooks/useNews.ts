"use client";

import { useCallback, useEffect, useState } from "react";
import type { NewsPage } from "../types/news.types";
import { NewsService } from "../services/news.services";
import { getCache, setCache, removeCache } from "@/src/utils/cache";

const NEWS_CACHE_KEY = "news_page_v2";

let newsRequest: Promise<NewsPage> | null = null;

const fetchNews = async (): Promise<NewsPage> => {
  const cached = getCache<NewsPage>(NEWS_CACHE_KEY);

  if (cached) {
    console.log("NEWS CACHE HIT:", cached);

    return cached;
  }

  console.log("NEWS CACHE MISS - FETCH API");

  if (newsRequest) {
    return newsRequest;
  }

  newsRequest = NewsService.getNewsPage()
    .then((data) => {
      console.log("NEWS API RESPONSE:", data);

      setCache<NewsPage>(NEWS_CACHE_KEY, data);

      return data;
    })
    .catch((error) => {
      removeCache(NEWS_CACHE_KEY);
      throw error;
    })
    .finally(() => {
      newsRequest = null;
    });

  return newsRequest;
};

interface UseNewsReturn {
  news: NewsPage | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useNews(): UseNewsReturn {
  const [news, setNews] = useState<NewsPage | null>(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const loadNews = async () => {
      try {
        const data = await fetchNews();

        if (cancelled) {
          return;
        }

        setNews(data);
        setError(null);
      } catch (err) {
        if (cancelled) {
          return;
        }

        console.error("Failed to fetch news:", err);

        setError(
          err instanceof Error ? err.message : "Failed to load news page",
        );
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    void loadNews();

    return () => {
      cancelled = true;
    };
  }, []);

  const refetch = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      removeCache(NEWS_CACHE_KEY);

      const data = await fetchNews();

      setNews(data);
    } catch (err) {
      console.error("Failed to refetch news:", err);

      setError(
        err instanceof Error ? err.message : "Failed to reload news page",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    news,
    loading,
    error,
    refetch,
  };
}
