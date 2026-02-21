import { createContext, useContext, useState, useCallback } from 'react';

const AnalysisContext = createContext(null);

export function AnalysisProvider({ children }) {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const setAnalysisResult = useCallback((data) => setResult(data), []);
  const setLoadingState = useCallback((state) => setLoading(state), []);

  return (
    <AnalysisContext.Provider
      value={{
        result,
        loading,
        setAnalysisResult,
        setLoadingState,
      }}
    >
      {children}
    </AnalysisContext.Provider>
  );
}

export function useAnalysis() {
  const ctx = useContext(AnalysisContext);
  if (!ctx) throw new Error('useAnalysis must be used within AnalysisProvider');
  return ctx;
}
