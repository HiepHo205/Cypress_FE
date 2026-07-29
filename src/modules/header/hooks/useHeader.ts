"use client";

import { useEffect, useState } from "react";

import { getHeader } from "../api/header.api";

import type { HeaderData } from "../types/header.type";

export function useHeader() {
  const [header, setHeader] = useState<HeaderData | null>(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    getHeader()
      .then((data) => {
        setHeader(data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return {
    header,
    loading,
    error,
  };
}
