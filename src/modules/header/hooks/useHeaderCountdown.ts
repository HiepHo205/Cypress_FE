"use client";

import { useEffect, useState } from "react";
import { getCountdown } from "../api/headerCountdown.api";
import { getCache, setCache, removeCache } from "@/src/utils/cache";

export interface CountdownData {
  target_date: string | null;
  enabled: boolean;
  button?: {
    label: string | null;
    href: string | null;
  };
}

const COUNTDOWN_CACHE_KEY = "header_countdown_v1";

export function useHeaderCountdown() {
  const [countdown, setCountdown] = useState<CountdownData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;

    const loadCountdown = async () => {
      const cached = getCache<CountdownData>(COUNTDOWN_CACHE_KEY);

      if (cached) {
        if (!cancelled) {
          setCountdown(cached);
          setLoading(false);
        }

        return;
      }

      try {
        const data = await getCountdown();

        if (cancelled) {
          return;
        }

        setCountdown(data);
        setError(null);

        setCache<CountdownData>(COUNTDOWN_CACHE_KEY, data);
      } catch (err) {
        if (cancelled) {
          return;
        }

        const error =
          err instanceof Error ? err : new Error("Failed to load countdown");

        console.error("Failed to load countdown:", error);

        removeCache(COUNTDOWN_CACHE_KEY);

        setError(error);
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    void loadCountdown();

    return () => {
      cancelled = true;
    };
  }, []);

  return {
    countdown,
    loading,
    error,
  };
}
