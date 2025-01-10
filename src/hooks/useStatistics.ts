import { useState, useEffect } from 'react';
import { fetchStatistics } from '../lib/services';
import type { Statistics } from '../lib/db/types';

export function useStatistics() {
  const [statistics, setStatistics] = useState<Statistics[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadStatistics() {
      try {
        const data = await fetchStatistics();
        setStatistics(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao carregar estatísticas');
      } finally {
        setLoading(false);
      }
    }

    loadStatistics();
  }, []);

  return { statistics, loading, error };
} 