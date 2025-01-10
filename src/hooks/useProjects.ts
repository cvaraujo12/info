import { useState, useEffect } from 'react';
import { fetchProjects } from '../lib/services';
import type { Project } from '../lib/db/types';

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadProjects() {
      try {
        const data = await fetchProjects();
        setProjects(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao carregar projetos');
      } finally {
        setLoading(false);
      }
    }

    loadProjects();
  }, []);

  return { projects, loading, error };
} 