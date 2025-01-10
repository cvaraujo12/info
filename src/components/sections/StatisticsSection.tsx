import React from 'react';
import { useStatistics } from '../../hooks/useStatistics';
import { StatisticsCard } from '../StatisticsCard';

export default function StatisticsSection() {
  const { statistics, loading, error } = useStatistics();
  const highlightedStats = statistics.slice(0, 4);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-16">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16 text-red-600">
        <p>Erro ao carregar estatísticas: {error}</p>
      </div>
    );
  }

  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-8">Estatísticas Principais</h2>
        <div className="grid md:grid-cols-4 gap-6">
          {highlightedStats.map(stat => <StatisticsCard key={stat.id} statistics={stat} />)}
        </div>
        <div className="text-center mt-8">
          <a href="/statistics" className="text-blue-600 font-semibold hover:text-blue-800">
            Ver mais estatísticas →
          </a>
        </div>
      </div>
    </section>
  );
} 