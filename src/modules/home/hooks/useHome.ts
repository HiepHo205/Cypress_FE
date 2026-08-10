"use client";

import { useEffect, useState } from "react";
import { HomeService } from "../services/home.service";
import type { HomepageData } from "../types/home.type";
import { getCache, setCache, removeCache } from "@/src/utils/cache";

const HOME_CACHE_KEY = "homepage_v2";

export function useHome() {
  const [homepage, setHomepage] = useState<HomepageData | null>(null);

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let mounted = true;

    const fetchHome = async () => {
      try {
        const cached = getCache<HomepageData>(HOME_CACHE_KEY);

        if (cached) {
          if (mounted) {
            setHomepage(cached);
          }

          return;
        }

        const data = await HomeService.getHomepage();

        if (!data) {
          throw new Error("Homepage response is empty");
        }

        if (mounted) {
          setHomepage(data);
        }

        setCache<HomepageData>(
          HOME_CACHE_KEY,

          data,

          5 * 60 * 1000,
        );
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
