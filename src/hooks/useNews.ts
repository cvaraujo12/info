import { useState, useEffect } from 'react';
import { fetchNews } from '../lib/services/api';
import type { News } from '../types/api';

export function useNews() {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadNews() {
      try {
        const data = await fetchNews();
        const newsData = data.map(item => ({
          id: item.id,
          title: item.title,
          content: item.content,
          date: item.date,
          author: item.author,
          source: item.source,
          category: item.category,
          imageUrl: item.imageUrl || undefined
        })) satisfies News[];
        setNews(newsData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao carregar notícias');
      } finally {
        setLoading(false);
      }
    }

    loadNews();
  }, []);

  return { news, loading, error };
} 