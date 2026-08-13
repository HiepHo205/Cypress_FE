"use client";

import { useEffect, useState } from "react";
import { HomeService } from "../services/home.service";
import type { HomepageData } from "../types/home.type";
import { getCache, setCache, removeCache } from "@/src/utils/cache";

const HOME_CACHE_KEY = "homepage_v2";

export function useHome() {
  const [homepage, setHomepage] = useState<HomepageData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const fetchHome = async () => {
      const cached = getCache<HomepageData>(HOME_CACHE_KEY);

      if (cached) {
        console.log("Homepage: using cached data");

        if (mounted) {
          setHomepage(cached);
          setLoading(false);
        }

        return;
      }

      try {
        console.log("Homepage: fetching from API");

        const data = await HomeService.getHomepage();

        if (!data) {
          throw new Error("Homepage response is empty");
        }

        setCache(HOME_CACHE_KEY, data);

        if (mounted) {
          setHomepage(data);
        }
      } catch (error) {
        console.error("Failed to fetch homepage:", error);

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
