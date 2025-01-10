import React from 'react';
import { Button, Select } from '../ui';
import type { Route } from '../../lib/db/types';

interface MapControlsProps {
  routes: Route[];
  selectedType: string | null;
  onTypeChange: (type: string | null) => void;
  onReset: () => void;
  className?: string;
}

export const MapControls: React.FC<MapControlsProps> = ({
  routes,
  selectedType,
  onTypeChange,
  onReset,
  className
}) => {
  // Obter tipos únicos de rotas
  const types = [...new Set(routes.map(route => route.type))];

  return (
    <div className={`bg-white rounded-lg shadow-sm p-4 ${className}`}>
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-gray-700">
            Tipo de Rota
          </label>
          <Select
            value={selectedType || ''}
            onChange={(e) => onTypeChange(e.target.value || null)}
            className="mt-1"
          >
            <option value="">Todas as rotas</option>
            {types.map(type => (
              <option key={type} value={type}>
                {type === 'Terrestre' ? 'Rotas Terrestres' : 'Rotas Marítimas'}
              </option>
            ))}
          </Select>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">
            {selectedType
              ? `${routes.filter(r => r.type === selectedType).length} rotas encontradas`
              : `${routes.length} rotas no total`}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={onReset}
          >
            Resetar Mapa
          </Button>
        </div>
      </div>
    </div>
  )
}; 