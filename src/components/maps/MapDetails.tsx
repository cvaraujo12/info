import React from 'react';
import { Button } from '../ui';
import type { Route } from '../../lib/db/types';

interface MapDetailsProps {
  route: Route | null;
  onClose: () => void;
  className?: string;
}

export const MapDetails: React.FC<MapDetailsProps> = ({
  route,
  onClose,
  className
}) => {
  if (!route) return null;

  return (
    <div className={`bg-white rounded-lg shadow-sm ${className}`}>
      <div className="relative">
        {route.imageUrl && (
          <div className="h-48 w-full">
            <img
              src={route.imageUrl}
              alt={route.name}
              className="w-full h-full object-cover rounded-t-lg"
            />
          </div>
        )}
        <Button
          variant="outline"
          size="sm"
          onClick={onClose}
          className="absolute top-2 right-2"
        >
          ✕
        </Button>
      </div>

      <div className="p-4 space-y-4">
        <div>
          <h3 className="text-lg font-semibold">{route.name}</h3>
          <div className="flex items-center gap-2 mt-1">
            <span className={`px-2 py-1 text-xs rounded-full ${
              route.type === 'Terrestre'
                ? 'bg-green-100 text-green-800'
                : 'bg-blue-100 text-blue-800'
            }`}>
              {route.type}
            </span>
            <span className={`px-2 py-1 text-xs rounded-full ${
              route.status === 'Operacional'
                ? 'bg-green-100 text-green-800'
                : 'bg-yellow-100 text-yellow-800'
            }`}>
              {route.status}
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-gray-600">
            {route.description}
          </p>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-gray-500">Origem</div>
              <div className="font-medium">{route.startPoint}</div>
            </div>
            <div>
              <div className="text-gray-500">Destino</div>
              <div className="font-medium">{route.endPoint}</div>
            </div>
            <div>
              <div className="text-gray-500">Distância</div>
              <div className="font-medium">{route.distance}</div>
            </div>
            <div>
              <div className="text-gray-500">Status</div>
              <div className="font-medium">{route.status}</div>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t">
          <Button
            variant="default"
            className="w-full"
            onClick={() => window.location.href = `/routes/${route.id}`}
          >
            Ver Detalhes Completos
          </Button>
        </div>
      </div>
    </div>
  );
}; 