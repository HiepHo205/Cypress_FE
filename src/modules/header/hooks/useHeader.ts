"use client";

import { useEffect, useState } from "react";

import { getHeader, getFavicon, getLogo } from "../api/header.api";
import type { HeaderData } from "../types/header.type";

import { getCache, setCache, removeCache } from "@/src/utils/cache";

const HEADER_CACHE_KEY = "header_data_v1";

export function useHeader() {
  const [header, setHeader] = useState<HeaderData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;

    const loadHeader = async () => {
      const cached = getCache<HeaderData>(HEADER_CACHE_KEY);

      if (cached) {
        if (!cancelled) {
          setHeader(cached);
          setLoading(false);
        }

        return;
      }

      try {
        const [headerData, faviconData, logoData] = await Promise.all([
          getHeader(),
          getFavicon(),
          getLogo(),
        ]);

        const finalHeader: HeaderData = {
          ...headerData,
          favicon: faviconData,
          logoData: logoData,
        };

        if (cancelled) {
          return;
        }

        setHeader(finalHeader);
        setError(null);

        setCache<HeaderData>(HEADER_CACHE_KEY, finalHeader);
      } catch (err) {
        if (cancelled) {
          return;
        }

        console.error("Failed to load header:", err);

        removeCache(HEADER_CACHE_KEY);

        setError(
          err instanceof Error ? err : new Error("Failed to load header"),
        );
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    void loadHeader();

    return () => {
      cancelled = true;
    };
  }, []);

  return {
    header,
    loading,
    error,
  };
}
