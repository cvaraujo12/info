import React, { useState, useEffect } from 'react';
import { Input } from '../ui';
import type { Route } from '../../lib/db/types';

interface MapSearchProps {
  routes: Route[];
  onSelect: (route: Route) => void;
  className?: string;
}

export const MapSearch: React.FC<MapSearchProps> = ({
  routes,
  onSelect,
  className
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<Route[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!searchTerm) {
      setResults([]);
      return;
    }

    const filtered = routes.filter(route => {
      const searchLower = searchTerm.toLowerCase();
      return (
        route.name.toLowerCase().includes(searchLower) ||
        route.startPoint.toLowerCase().includes(searchLower) ||
        route.endPoint.toLowerCase().includes(searchLower)
      );
    });

    setResults(filtered.slice(0, 5));
  }, [searchTerm, routes]);

  return (
    <div className={`relative ${className}`}>
      <Input
        type="search"
        placeholder="Buscar rotas, cidades ou países..."
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setIsOpen(true);
        }}
        className="w-full"
      />

      {isOpen && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg overflow-hidden z-10">
          {results.map((route) => (
            <button
              key={route.id}
              className="w-full px-4 py-2 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none"
              onClick={() => {
                onSelect(route);
                setSearchTerm('');
                setIsOpen(false);
              }}
            >
              <div className="flex items-center gap-2">
                <span className="text-lg">
                  {route.type === 'Terrestre' ? '🚂' : '🚢'}
                </span>
                <div>
                  <div className="font-medium">{route.name}</div>
                  <div className="text-sm text-gray-500">
                    {route.startPoint} → {route.endPoint}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      {isOpen && searchTerm && results.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg overflow-hidden z-10">
          <div className="px-4 py-2 text-sm text-gray-500">
            Nenhuma rota encontrada
          </div>
        </div>
      )}
    </div>
  );
}; 