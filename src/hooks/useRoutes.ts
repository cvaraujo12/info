import { useState, useEffect } from 'react';
import { fetchRoutes } from '../lib/services';
import type { Route } from '../lib/db/types';

export function useRoutes() {
  const [routes, setRoutes] = useState<Route[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadRoutes() {
      try {
        const data = await fetchRoutes();
        setRoutes(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao carregar rotas');
      } finally {
        setLoading(false);
      }
    }

    loadRoutes();
  }, []);

  return { routes, loading, error };
} 