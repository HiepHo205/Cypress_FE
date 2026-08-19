"use client";

import { useEffect, useState } from "react";
import { HomeService } from "../services/home.service";
import type { HomepageData } from "../types/home.type";
import { getCache, setCache, removeCache } from "@/src/utils/cache";

const HOME_CACHE_KEY = "homepage_v3";

export function useHome() {
  const [homepage, setHomepage] = useState<HomepageData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const fetchHome = async () => {
      const cached = getCache<HomepageData>(HOME_CACHE_KEY);

      if (cached) {
        if (mounted) {
          setHomepage(cached);
          setLoading(false);
        }

        return;
      }

      try {
        const data = await HomeService.getHomepage();

        if (!data) {
          throw new Error("Homepage response is empty");
        }

        setCache(HOME_CACHE_KEY, data);

        if (mounted) {
          setHomepage(data);
        }
      } catch (error) {
        removeCache(HOME_CACHE_KEY);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchHome();

    return () => {
      mounted = false;
    };
  }, []);

  return {
    homepage,
    loading,
  };
}
