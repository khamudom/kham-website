"use client";

import { useState, useEffect } from "react";

interface ApiResponse<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

export function useApi<T>(
  fetchFn: () => Promise<T>,
  dependencies: any[] = []
): ApiResponse<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let mounted = true;

    async function fetchData() {
      try {
        setLoading(true);
        const result = await fetchFn();
        if (mounted) {
          setData(result);
          setError(null);
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err : new Error("An error occurred"));
          setData(null);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    fetchData();

    return () => {
      mounted = false;
    };
  }, dependencies);

  return { data, loading, error };
}
