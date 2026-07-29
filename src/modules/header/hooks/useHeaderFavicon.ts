"use client";

import { useEffect, useState } from "react";
import { getFavicon } from "../api/headerFavicon.api";

export interface FaviconData {
  url: string | null;
  public_id: string | null;
}

export function useHeaderFavicon() {
  const [favicon, setFavicon] = useState<FaviconData | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavicon = async () => {
      try {
        const data = await getFavicon();

        console.log("FAVICON DATA:", data);

        setFavicon(data);
      } catch (error) {
        console.error("GET FAVICON ERROR:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavicon();
  }, []);

  return {
    favicon,
    loading,
  };
}
