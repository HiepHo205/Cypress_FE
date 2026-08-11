"use client";

import { useEffect, useState } from "react";

import { getHeader, getFavicon, getLogo } from "../api/header.api";

import type { HeaderData } from "../types/header.type";

export function useHeader() {
  const [header, setHeader] = useState<HeaderData | null>(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadHeader = async () => {
      try {
        const [headerData, faviconData, logoData] = await Promise.all([
          getHeader(),
          getFavicon(),
          getLogo(),
        ]);

        const finalHeader = {
          ...headerData,
          favicon: faviconData,
          logoData: logoData,
        };

        setHeader(finalHeader);
      } catch (err) {
        console.error("Failed to load header:", err);

        setError(
          err instanceof Error ? err : new Error("Failed to load header"),
        );
      } finally {
        setLoading(false);
      }
    };

    loadHeader();
  }, []);

  return {
    header,
    loading,
    error,
  };
}
