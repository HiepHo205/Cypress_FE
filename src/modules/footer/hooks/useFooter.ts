"use client";

import { useEffect, useState } from "react";

import { getFooter } from "../services/footer.service";
import type { Footer } from "../types/footer.type";

import { getCache, setCache, removeCache } from "@/src/utils/cache";

const FOOTER_CACHE_KEY = "footer_v1";

let footerRequest: Promise<Footer> | null = null;

const fetchFooter = async (): Promise<Footer> => {
  const cached = getCache<Footer>(FOOTER_CACHE_KEY);

  if (cached) {
    return cached;
  }

  if (footerRequest) {
    return footerRequest;
  }

  footerRequest = getFooter()
    .then((data) => {
      setCache<Footer>(FOOTER_CACHE_KEY, data);

      return data;
    })
    .catch((error) => {
      removeCache(FOOTER_CACHE_KEY);
      throw error;
    })
    .finally(() => {
      footerRequest = null;
    });

  return footerRequest;
};

export const useFooter = () => {
  const [footer, setFooter] = useState<Footer | null>(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const loadFooter = async () => {
      try {
        const data = await fetchFooter();

        if (cancelled) {
          return;
        }

        setFooter(data);
        setError(null);
      } catch (err) {
        if (cancelled) {
          return;
        }

        setError(err instanceof Error ? err.message : "Failed to fetch footer");
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    void loadFooter();

    return () => {
      cancelled = true;
    };
  }, []);

  return {
    footer,
    loading,
    error,
  };
};
