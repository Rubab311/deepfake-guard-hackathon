import { useState, useCallback } from 'react';
import { analyzeImage } from '../api/analyze';
import { runMockAnalysis } from '../utils/mockAnalysis';

const USE_REAL_API = import.meta.env.VITE_USE_REAL_API !== 'false';

function isNetworkError(err) {
  const msg = (err?.message || '').toLowerCase();
  return msg.includes('fetch') || msg.includes('network') || msg.includes('failed') || msg.includes('connection');
}

export function useImageAnalysis() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const analyze = useCallback(async (file) => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      let data;
      if (USE_REAL_API) {
        try {
          data = await analyzeImage(file);
        } catch (apiErr) {
          if (isNetworkError(apiErr)) {
            data = await runMockAnalysis(file);
          } else {
            throw apiErr;
          }
        }
      } else {
        data = await runMockAnalysis(file);
      }
      setResult(data);
    } catch (err) {
      setError(err.message || 'Analysis failed');
    } finally {
      setLoading(false);
    }
  }, []);

  const resetResult = useCallback(() => {
    setResult(null);
    setError(null);
  }, []);

  return { analyze, result, loading, error, resetResult };
}
