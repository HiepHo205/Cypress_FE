"use client";

import { useEffect, useState } from "react";
import { getCountdown } from "../api/headerCountdown.api";

export interface CountdownData {
  target_date: string | null;
  enabled: boolean;
  button?: {
    label: string | null;
    href: string | null;
  };
}

export function useHeaderCountdown() {
  const [countdown, setCountdown] = useState<CountdownData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchCountdown = async () => {
      try {
        const data = await getCountdown();
        setCountdown(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchCountdown();
  }, []);

  return {
    countdown,
    loading,
    error,
  };
}
