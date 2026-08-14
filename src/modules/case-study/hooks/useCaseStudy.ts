"use client";

import { useCallback, useEffect, useState } from "react";
import type { CaseStudyPage } from "../types/case-study.types";
import { CaseStudyService } from "../services/case-study.services";
import { getCache, setCache, removeCache } from "@/src/utils/cache";

const CASE_STUDY_CACHE_KEY = "case_study_page_v1";

let caseStudyRequest: Promise<CaseStudyPage> | null = null;

const fetchCaseStudy = async (): Promise<CaseStudyPage> => {
  const cached = getCache<CaseStudyPage>(CASE_STUDY_CACHE_KEY);

  if (cached) {
    return cached;
  }

  if (caseStudyRequest) {
    return caseStudyRequest;
  }

  caseStudyRequest = CaseStudyService.getCaseStudyPage()
    .then((data) => {
      setCache<CaseStudyPage>(CASE_STUDY_CACHE_KEY, data);

      return data;
    })
    .catch((error) => {
      removeCache(CASE_STUDY_CACHE_KEY);
      throw error;
    })
    .finally(() => {
      caseStudyRequest = null;
    });

  return caseStudyRequest;
};

interface UseCaseStudyReturn {
  caseStudy: CaseStudyPage | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useCaseStudy(): UseCaseStudyReturn {
  const [caseStudy, setCaseStudy] = useState<CaseStudyPage | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const loadCaseStudy = async () => {
      try {
        const data = await fetchCaseStudy();

        if (cancelled) {
          return;
        }

        setCaseStudy(data);
        setError(null);
      } catch (err) {
        if (cancelled) {
          return;
        }

        console.error("Failed to fetch case study:", err);

        setError(
          err instanceof Error ? err.message : "Failed to load case study page",
        );
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    void loadCaseStudy();

    return () => {
      cancelled = true;
    };
  }, []);

  const refetch = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      removeCache(CASE_STUDY_CACHE_KEY);

      const data = await fetchCaseStudy();

      setCaseStudy(data);
    } catch (err) {
      console.error("Failed to refetch case study:", err);

      setError(
        err instanceof Error ? err.message : "Failed to reload case study page",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    caseStudy,
    loading,
    error,
    refetch,
  };
}
