

import { useState, useEffect, useCallback } from 'react';

export const useFetch = (apiFunc, params = [], lazy = false) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(!lazy);
  const [error, setError] = useState(null);

  const exec = useCallback(async (newParams) => {
    const paramsToUse = newParams || params;
    setLoading(true);
    setError(null);
    try {
      const result = await apiFunc(...paramsToUse);
      setData(result);
    } catch (e) {
      console.error("useFetch error:", e);
      setError(e);
    } finally {
      setLoading(false);
    }
  }, [apiFunc, ...params]);

  useEffect(() => {
    if (!lazy) {
      exec();
    }
  }, [exec, lazy]);

  return { data, loading, error, exec };
};