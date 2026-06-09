import { useEffect, useState } from 'react';
import { MetricsData } from '../types';

export const useMetrics = () => {
  const [data, setData] = useState<MetricsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMetrics = async () => {
      try {
        const response = await fetch('/opensourcepulse/data/metrics.json');
        if (!response.ok) throw new Error('Failed to load metrics');
        const metricsData = await response.json();
        setData(metricsData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    loadMetrics();
  }, []);

  return { data, loading, error };
};
