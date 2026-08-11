"use client";

import { useEffect, useState } from "react";
import { getFooter } from "../services/footer.service";
import type { Footer } from "../types/footer.type";

export const useFooter = () => {
  const [footer, setFooter] = useState<Footer | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await getFooter();

        setFooter(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch footer");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return {
    footer,
    loading,
    error,
  };
};
